import React, {useContext, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import {EventContext} from "./EventContext";

const TestClick: React.FC = () => {
    const map = useMapEvents({
        click(e) {
            console.log(e.latlng);
        },
    });

    return null;
}

export function KinderMapApp() {

    const {eventList} = useContext(EventContext);

    return (
        <MapContainer center={[54.3749, 18.6943]} zoom={11} scrollWheelZoom={true} style={{height: "500px"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {eventList.map(value =>
                <Marker position={[value.lat!, value.lng!]}>
                    <Popup>
                        <h3>{value.title}</h3>
                    </Popup>
                </Marker>
            )}
            <TestClick/>
        </MapContainer>
    );
}