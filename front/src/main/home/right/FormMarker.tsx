import React, {useContext, useEffect, useRef, useState} from "react";
import {Icon, LatLng} from "leaflet";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import DatePicker from "react-datepicker";
import new_event_image from './new_event.png';

import 'react-datepicker/dist/react-datepicker.css'

import {EventContext} from "./EventContext";

const FormMarker: React.FC = () => {
    const [position, setPosition] = useContext(EventContext).positionState;

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

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
                <h1>Popup</h1>

            </Popup>
        </Marker>
    )
    // } else
    //     return null
}

export default FormMarker;