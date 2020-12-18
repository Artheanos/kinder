import React, {JSXElementConstructor, useContext, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import {EventContext} from "./EventContext";
import {DivIcon, Icon, LatLng} from "leaflet";

const TestClick: React.FC<any> = (props) => {
    const [position, setPosition] = useState<LatLng | null>(null);

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    if (position)
        return (
            <Marker position={position}>
                <Popup className="popup-input">
                    <form>
                        <div className="form-row">
                            <label>
                                Title
                                <input className="form-control" type="text"/>
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Description
                                <input className="form-control" type="text"/>
                            </label>
                        </div>
                    </form>
                </Popup>
            </Marker>
        )
    else
        return null
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
                <Marker position={[value.lat!, value.lng!]} title={value.title}>
                    <Popup>
                        <h3>{value.title}</h3>
                    </Popup>
                </Marker>
            )}
            <TestClick/>
        </MapContainer>
    );
}