import React, {useEffect, useRef, useState} from "react";
import {Icon, LatLng} from "leaflet";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import DatePicker from "react-datepicker";
import new_event_image from './new_event.png';

import 'react-datepicker/dist/react-datepicker.css'

const FormMarker: React.FC = (props) => {
    const [position, setPosition] = useState<LatLng | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [limit, setLimit] = useState(0);

    const startDatePicker = React.createRef<DatePicker>();
    const endDatePicker = React.createRef<DatePicker>();

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let body = {
            title,
            description,
            startDate,
            endDate
        }

        console.log(body);
    }

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
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>
                            Title
                            <input className="form-control" type="text" value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Start date
                            <DatePicker className="form-control onblur-fix" selected={startDate}
                                        onChange={(date, event) => {
                                            setStartDate(date as Date);
                                            event?.preventDefault();
                                        }}
                                        onFocus={() => endDatePicker.current?.setOpen(false)}
                                        ref={startDatePicker}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            End date
                            <DatePicker className="form-control" selected={endDate}
                                        onChange={(date, event) => {
                                            setEndDate(date as Date);
                                            event?.preventDefault();
                                        }}
                                        onBlur={() => {
                                            console.log("?");
                                            // endDatePicker.current!.setOpen(false);
                                        }}
                                        ref={endDatePicker}
                            >
                                <div>dupa</div>
                            </DatePicker>
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Description
                            <input className="form-control" type="text" value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Limit <b>{limit || "No limit"}</b>
                            <input type="range" className="custom-range" min="0" max="100" step="1" value={limit}
                                   onChange={(e) => setLimit(+e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <input type="submit" className="btn btn-primary"/>
                    </div>
                </form>
            </Popup>
        </Marker>
    )
    // } else
    //     return null
}

export default FormMarker;