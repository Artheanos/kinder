import React from "react";
import {EventResponseObject} from "../../../../common/EventObjects";
import {Link} from "react-router-dom";

const EventItem: React.FC<{ eventObject: EventResponseObject }> = ({eventObject}) => {
    return (
        <div>
            <h2>{eventObject.title}</h2>
            <p className="lead">{eventObject.description}</p>
            <div>
                <Link to={`/event/${eventObject.id}`}>Go to event</Link>
            </div>
        </div>
    );
}
export default EventItem