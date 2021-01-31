import React, {useContext, useEffect, useState} from "react";
import {Icon} from "leaflet";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import new_event_image from './new_event.png';
import 'react-datepicker/dist/react-datepicker.css'
import {EventContext} from "../EventContext";
import {locationToAddress} from "../../../../common/util";

const NewEventMarker: React.FC = () => {
    const [position, setPosition] = useContext(EventContext).positionState;
    const [msg, setMsg] = useState('Event');

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    useEffect(() => {
        if (position?.lat && position?.lng) {
            locationToAddress(position.lat, position.lng).then(r => setMsg(r.display_name));
        }
    }, [position?.lat, position?.lng])

    // if (position) {
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
    // } else
    //     return null
}

export default NewEventMarker;