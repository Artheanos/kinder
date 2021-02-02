import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {addressToLocation, KINDER_BACK_URL, myDateFormat} from "../../common/util";
import {LatLng} from "leaflet";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import EventFormMarker from "./EventFormMarker";


const EventForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [capacity, setLimit] = useState(0);
    const [photo, setPhoto] = useState<File | null>(null);
    const [addressName, setAddressName] = useState('');
    const [category, setCategory] = useState('Impreza');

    const [position, setPosition] = useState<LatLng | null>(null);
    const [extraPosition, setExtraPosition] = useState<LatLng | null>(null);

    const [categories, setCategories] = useState<Kinder.Category[]>([]);

    async function fetchCategories() {
        let response = await fetch(`${KINDER_BACK_URL}/category/all`);
        let result: Kinder.Category[] = JSON.parse(await response.text());
        setCategories(result);
    }

    function fileInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;

        if (!files) return;

        setPhoto(files[0]);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let body = {
            title,
            description,
            category,
            address_name: addressName,
            startDate: myDateFormat(startDate),
            endDate: myDateFormat(endDate),
            latitude: position?.lat,
            longitude: position?.lng,
            category_title: "testCategory",
            capacity
        }

        console.log(JSON.stringify(body));

        let formData = new FormData();

        if (photo) {
            formData.append('file', photo)
        }

        formData.append("data",
            new Blob(
                [JSON.stringify(body)],
                {type: "application/json"}
            )
        )

        fetch(`${KINDER_BACK_URL}/event`,
            {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            }
        ).then(i => {
            if (i.status === 200) {
                alert("SUCCESS");
            } else {
                alert("ERROR " + i.status);
                i.text().then(txt => console.log("REASON " + txt));
            }
        });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="Event-form p-5">
            <h1>Create Event</h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label>
                        Location
                    </Form.Label>
                    <MapContainer center={[54.3749, 18.6943]} zoom={11} scrollWheelZoom={true}
                                  style={{height: '200px', borderRadius: '0.4rem'}}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <EventFormMarker {...{position, setPosition, extraPosition}}/>
                    </MapContainer>
                    <Form.Control readOnly={true}
                                  value={position ? `${position.lat} ${position.lng}` : 'Click the map to set location'}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={addressName} onChange={e => setAddressName(e.target.value)}/>
                    <Button variant="outline-secondary" className="mt-2" onClick={async () => {
                        let response = await addressToLocation(addressName);
                        if (response) {
                            let jsonData: OSMObject[] = JSON.parse(response);
                            if (jsonData.length > 0 && position) {
                                position.lat = Number(jsonData[0].lat);
                                position.lng = Number(jsonData[0].lon);
                                setExtraPosition(new LatLng(position.lat, position.lng));
                            }
                        }
                    }}>Go to</Button>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Start date
                    </Form.Label>
                    <Form.Control className="form-control onblur-fix" value={startDate} type="date"
                                  onChange={(event) => {
                                      setStartDate(event.target.value);
                                      event?.preventDefault();
                                  }}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        End Date
                    </Form.Label>
                    <Form.Control type="date" className="form-control" value={endDate}
                                  onChange={(event) => {
                                      setEndDate(event.target.value);
                                      event?.preventDefault();
                                  }}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>

                <Form.Group className="form-row">
                    <Form.Label>Limit: <b>{capacity || "No limit"}</b> </Form.Label>
                    <input type="range" className="custom-range" min="0" max="100" step="1" value={capacity}
                           onChange={(e) => setLimit(+e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Photo
                    </Form.Label>
                    <Form.Control type="file" onChange={fileInputOnChange}/>
                </Form.Group>

                <Button variant="primary" type="submit" className="btn btn-primary">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default EventForm