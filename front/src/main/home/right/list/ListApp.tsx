import React from "react";
import {EventContext} from "../EventContext";
import EventItem from "./EventItem";

export const ListApp: React.FC = () => {
    const {eventList} = React.useContext(EventContext);

    return (
        <div className="container mt-3">
            <ul className="list-group">
                {
                    eventList.map(value =>
                        <li className="list-group-item"><EventItem eventObject={value}/></li>
                    )
                }
            </ul>
        </div>
    )
}