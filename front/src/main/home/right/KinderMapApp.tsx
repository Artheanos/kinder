import React, {useContext} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {EventContext} from "./EventContext";
import FormMarker from "./FormMarker";


export function KinderMapApp() {

    const {eventList} = useContext(EventContext);

    return (
        <MapContainer center={[54.3749, 18.6943]} zoom={11} scrollWheelZoom={true} style={{height: "500px"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {eventList.map(value =>
                <Marker position={[value.address!.latitude, value.address!.longitude]} title={value.title}>
                    <Popup>
                        <h3>{value.title}</h3>
                    </Popup>
                </Marker>
            )}
            <FormMarker/>
        </MapContainer>
    );
}