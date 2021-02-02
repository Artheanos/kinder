import React, {useEffect, useState} from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import {locationToAddress} from "../../common/util";
import {Icon, LatLng} from "leaflet";
import new_event_image from "../home/right/map/new_event.png";

type EventFormMarkerProps = {
    extraPosition: LatLng | null
    position: LatLng | null
    setPosition: (arg: LatLng) => any
}
const EventFormMarker: React.FC<EventFormMarkerProps> = ({position, setPosition, extraPosition}) => {
    const [msg, setMsg] = useState('Event');

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    useEffect(() => {
        if (position) {
            if (position.lat && position.lng) {
                locationToAddress(position.lat, position.lng).then(r => setMsg(r.display_name));
            }
        }
    }, [position]);

    useEffect(() => {
        if (position)
            map.setView(position, 15);
    }, [extraPosition]);

    return (
        <Marker position={position || [0, 0]}
                icon={new Icon({
                    iconUrl: new_event_image,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [0, -41],
                })}
        >
            <Popup className="popup-input">
                <h3>{msg}</h3>
            </Popup>
        </Marker>
    )
}

export default EventFormMarker;