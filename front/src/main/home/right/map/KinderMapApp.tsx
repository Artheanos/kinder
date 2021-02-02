import React, {useContext} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import {EventContext} from "../EventContext";
import NewEventMarker from "./NewEventMarker";
import EventMarker from "./EventMarker";


export function KinderMapApp() {

    const {eventList} = useContext(EventContext);

    return (
        <MapContainer center={[54.3749, 18.6943]} zoom={11} scrollWheelZoom={true} style={{height: "inherit"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {eventList.map(event => <EventMarker key={event.id} eventObject={event}/>)}
            <NewEventMarker/>
        </MapContainer>
    );
}
