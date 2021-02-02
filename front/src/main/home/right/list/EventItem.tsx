import React from "react";
import {Link} from "react-router-dom";
import {photoUrl} from "../../../../common/util";

const EventItem: React.FC<{ eventObject: Kinder.EventResponseObject }> = ({eventObject}) => {
    return (
        <div className="d-flex w-100 justify-content-between">
            <div>
                <h2>{eventObject.title}</h2>
                <div>{eventObject.eventCreator.name} {eventObject.eventCreator.surname}</div>
                <p className="lead">{eventObject.description}</p>
                <div>
                    <Link to={`/event/${eventObject.id}`}>Go to event</Link>
                </div>
            </div>
            {eventObject.photo ?
                <img style={{width: '100px'}} src={photoUrl(eventObject.photo.url)} alt={eventObject.title}/> : null}
        </div>
    );
}
export default EventItem