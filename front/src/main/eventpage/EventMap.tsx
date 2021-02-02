import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";

type Props = {
    lat: number,
    lng: number,
    title: string
}

export const EventMap: React.FC<Props> = (props: Props) => {

    return (
        <div className={"map-container"}>
            <MapContainer center={[props.lat, props.lng]} zoom={11} scrollWheelZoom={true} className={"event-map"}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[props.lat, props.lng]}>
                    <Popup>
                        {props.title}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>


    )
}