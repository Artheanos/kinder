import React from "react";
import {EventContext} from "./EventContext";

export const ListApp: React.FC = () => {
    const {eventList, setEventList} = React.useContext(EventContext);

    return (
        <div className="container mt-3">
            <ul className="list-group">
                {
                    eventList.map(value => <li className="list-group-item">{value.title}</li>)
                }
            </ul>
        </div>
    )
}