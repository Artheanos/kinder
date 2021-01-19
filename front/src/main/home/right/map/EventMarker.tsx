import {Marker, Popup} from "react-leaflet";
import React from "react";
import {EventResponseObject} from "../../../../common/EventObjects";
import {myDateFormat, photoUrl} from "../../../../common/util";
import {FormLabel} from "react-bootstrap";


const EventMarker: React.FC<{ eventObject: EventResponseObject }> = ({eventObject}) => {
    return (
        <Marker position={[eventObject.address!.latitude, eventObject.address!.longitude]} title={eventObject.title}>
            <Popup>
                <div className="Event-marker px-2 py-3">
                    {eventObject.photo ? <img src={photoUrl(eventObject.photo.url)} alt={eventObject.title}/> : null}
                    <h3>{eventObject.title}</h3>
                    <h6>{eventObject.description}</h6>
                    <div>Max <b>{eventObject.capacity}</b> people</div>
                    <div>
                        From
                        <b> {myDateFormat(new Date(eventObject.startDate))} </b>
                        to
                        <b> {myDateFormat(new Date(eventObject.endDate))}</b>
                    </div>
                    <div>At <b>{eventObject.address.address_name}</b></div>
                    <div className="d-flex align-items-center between">
                        <FormLabel className="mb-0 mr-3">Coming?</FormLabel>
                        <input style={{width: '20px', height: '20px'}} type="checkbox"/>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}
export default EventMarker;