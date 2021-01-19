import React, {useContext, useState} from "react";
import DatePicker from "react-datepicker";
import {Button, Form} from "react-bootstrap";
import {EventContext} from "./EventContext";
import {KINDER_BACK_URL, myDateFormat} from "../../../common/util";
import {OSMObject} from "../../../common/OSMObject";
import {LatLng} from "leaflet";


async function addressToLocation(address: string) {
    try {
        let response = await fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURI(address));
        return await response.text();
    } catch (e) {
        alert(e);
    }
}

async function locationToAddress(lat: string | number, lng: string | number): Promise<string> {
    try {
        let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
        return await response.text();
    } catch (e) {
        throw e;
    }
}

const EventForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [capacity, setLimit] = useState(0);
    const [photo, setPhoto] = useState<File | null>(null);
    const [addressName, setAddressName] = useState('');

    const startDatePicker = React.createRef<DatePicker>();
    const endDatePicker = React.createRef<DatePicker>();

    const [position, setPosition] = useContext(EventContext).positionState;

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

    return (
        <div className="Event-form p-5">
            <h1>Create Event</h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label>
                        Location
                    </Form.Label>
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
                                setPosition(new LatLng(position.lat, position.lng));
                            }
                        }
                    }}>Go to</Button>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Start date
                    </Form.Label>
                    <DatePicker className="form-control onblur-fix" selected={startDate}
                                onChange={(date, event) => {
                                    setStartDate(date as Date);
                                    event?.preventDefault();
                                }}
                                onFocus={() => endDatePicker.current?.setOpen(false)}
                                ref={startDatePicker}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        End Date
                    </Form.Label>
                    <DatePicker className="form-control" selected={endDate}
                                onChange={(date, event) => {
                                    setEndDate(date as Date);
                                    event?.preventDefault();
                                }}
                                ref={endDatePicker}
                    >
                    </DatePicker>
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