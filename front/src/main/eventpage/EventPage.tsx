import React, {useContext, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {KINDER_BACK_URL, myDateFormat, photoUrl} from "../../common/util";
import {Button, Col, Container, FormLabel, Row} from "react-bootstrap";
import Friend from "../friends/components/Friend";
import {EventContext} from "../home/right/EventContext";
import EventItem from "../home/right/list/EventItem";
import {Link} from "react-router-dom";
import {MapContainer, TileLayer} from "react-leaflet";
import EventMarker from "../home/right/map/EventMarker";
import NewEventMarker from "../home/right/map/NewEventMarker";
import {EventMap} from "./EventMap";

type EventPageProps = RouteComponentProps<{ eventId: string }>

const EventPage: React.FC<EventPageProps> = (props) => {
    const eventId = props.match.params.eventId;
    const [eventObject, setEventObject] = useState<Kinder.EventResponseObject | null>(null);

    const [going, setGoing] = useState(false);

    function fetchEvent() {
        fetch(`${KINDER_BACK_URL}/event/id/${eventId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            res.text().then(val => {
                let jsonData: Kinder.EventResponseObject = JSON.parse(val);
                setEventObject(jsonData);
            })
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let method = going ? "DELETE" : "POST";
        fetch(`${KINDER_BACK_URL}/event/participation?id=${eventObject!.id}`, {
            method,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.ok) {
                setGoing(!going);
                fetchEvent();
            } else {
                alert("Something went wrong with attending to the event");
                console.log(res);
                res.text().then(console.log);
            }
        })
    }

    useEffect(() => {
        fetchEvent();
    }, []);

    useEffect(() => {
        fetch(`${KINDER_BACK_URL}/event/participation`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.ok) {
                res.text().then(value => {
                    if (eventObject !== null) {
                        let jsonData: Kinder.EventResponseObject[] = JSON.parse(value);
                        setGoing(jsonData.map(i => i.id).includes(eventObject.id))
                    }
                })
            }
        })
    }, [eventObject])

    if (eventObject !== null) {
        const startDate = new Date(eventObject.startDate);
        const endDate = new Date(eventObject.endDate);
        return (
            <div className="Event-page py-5">
                <Container>
                    <Row>
                        <Col sm={12} md={4} className="text-md-left text-center">
                            <h1>{eventObject.title}</h1>
                            <p className="lead">{eventObject.description}</p>
                            <hr/>
                            <div>Author: <div><Friend userBasic={eventObject.eventCreator}/></div></div>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <h3>When?</h3>
                                    <div>Starts on {myDateFormat(startDate).split(' ').join(' at ')}</div>
                                    <div>Ends on {myDateFormat(endDate).split(' ').join(' at ')}</div>
                                </li>
                                <li className="list-group-item">
                                    <h3>Where?</h3>
                                    <div className="mb-3">At {eventObject.address.address_name}</div>
                                    <EventMap lat={eventObject.address.latitude} lng={eventObject.address.longitude} title={eventObject.title}/>
                                </li>
                            </ul>
                        </Col>
                        <Col sm={12} md={8} className="mb-3">
                            {/*{eventObject.photo ?*/}

                            {/*    <div className="text-center">*/}
                            {/*        <img className="EventImage" alt={eventObject.title}*/}
                            {/*             src={photoUrl(eventObject.photo.url)}*/}
                            {/*             style={{maxWidth: '200px', maxHeight: '200px'}}/>*/}
                            {/*    </div>*/}
                            {/*    : null}*/}
                            <div className="d-flex flex-wrap">
                                <div className="d-flex align-items-center w-100 between my-3">
                                    <h3 className="w-100">Participants</h3>
                                    {eventObject.eventCreator.urlId !== localStorage.getItem('urlId') ?
                                        <>
                                            <FormLabel className="mb-0 mr-3">Coming?</FormLabel>
                                            <input style={{width: '20px', height: '20px'}} type="checkbox"
                                                   checked={going}
                                                   onChange={handleChange}/>
                                        </> : null}
                                </div>
                                <h6 className="w-100">{eventObject.participants.length} out
                                    of {eventObject.capacity}</h6>
                                {eventObject.participants.map(i =>
                                    <div key={i.urlId}><Friend userBasic={i}/></div>
                                )}
                            </div>
                        </Col>
                    </Row>
                    {/*{Object.entries(eventObject).map(i =>*/}
                    {/*    <p>{i[0].toString()}, {JSON.stringify(i[1])}</p>*/}
                    {/*)}*/}
                </Container>
            </div>
        )
    } else {
        return null;
    }
}
export default EventPage