import {Marker, Popup} from "react-leaflet";
import React, {useContext, useEffect, useState} from "react";
import {KINDER_BACK_URL, KINDER_FRONT_URL, myDateFormat, photoUrl} from "../../../../common/util";
import {FormLabel} from "react-bootstrap";
import {EventContext} from "../EventContext";
import {Link} from "react-router-dom";


const EventMarker: React.FC<{ eventObject: Kinder.EventResponseObject }> = ({eventObject}) => {
    const [myEvents] = useContext(EventContext).myEventsState;
    const [going, setGoing] = useState(false);

    useEffect(() => {
        setGoing(myEvents.includes(eventObject.id));
    }, [myEvents]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let method = going ? "DELETE" : "POST";
        fetch(`${KINDER_BACK_URL}/event/participation?id=${eventObject.id}`, {
            method,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.ok) {
                setGoing(!going);
            } else {
                alert("Something went wrong with attending to the event");
                console.log(res);
                res.text().then(console.log);
            }
        })
    }

    return (
        <Marker position={[eventObject.address!.latitude, eventObject.address!.longitude]} title={eventObject.title}>
            <Popup>
                <div className="Event-marker px-2 py-3">
                    {eventObject.photo ? <img src={photoUrl(eventObject.photo.url)} alt={eventObject.title}/> : null}
                    <h3>{eventObject.title}</h3>
                    <h6>{eventObject.description}</h6>
                    <div>
                        <b>{eventObject.participants.length} out of {eventObject.capacity}</b> people are going
                    </div>
                    <div>
                        From
                        <b> {myDateFormat(new Date(eventObject.startDate))} </b>
                        to
                        <b> {myDateFormat(new Date(eventObject.endDate))}</b>
                    </div>
                    <div>At <b>{eventObject.address.address_name}</b></div>
                    <div className="d-flex align-items-center between">
                        <FormLabel className="mb-0 mr-3">Coming?</FormLabel>
                        <input style={{width: '20px', height: '20px'}} type="checkbox" checked={going}
                               onChange={handleChange}/>
                    </div>
                    <div>
                        <Link to={`/event/${eventObject.id}`}>Go to event</Link>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}
export default EventMarker;