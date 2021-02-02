import React from "react";
import {EventContext} from "../EventContext";
import EventItem from "./EventItem";

export const EventList: React.FC<{eventList: Kinder.EventResponseObject[]}> = ({eventList}) => {
    return (
        <div className="container mt-3">
            <ul className="list-group">
                {
                    eventList.map(value =>
                        <li key={value.id} className="list-group-item"><EventItem eventObject={value}/></li>
                    )
                }
            </ul>
        </div>
    )
}

export default EventList;