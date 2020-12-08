import React from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

export const HomeApp = () => {
    return (
        <MapContainer center={[54.3749, 18.6943]} zoom={11} scrollWheelZoom={true} style={{height: "500px"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[54.447350, 18.563297]}>
                <Popup>
                    <h3>Tańce połamańce</h3>
                </Popup>
            </Marker>
        </MapContainer>
    );
}