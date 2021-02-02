import React from "react";
import {EventContext} from "../EventContext";
import EventItem from "./EventItem";
import EventList from "./EventList";

const ListApp: React.FC = () => {
    const {eventList} = React.useContext(EventContext);

    return (
        <EventList eventList={eventList}/>
    )
}

export default ListApp;