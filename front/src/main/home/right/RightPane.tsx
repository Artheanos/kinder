import React, {useEffect} from "react";
import {KinderMapApp} from "./map/KinderMapApp";
import {ListApp} from "./ListApp";
import {MapContext} from "../MapSwitchContext";
import {EventContext} from "./EventContext";
import {EventResponseObject} from "../../../common/EventObjects";
import {KINDER_BACK_URL} from "../../../common/util";
import EventForm from "./EventForm";
import {LatLng} from "leaflet";


export const RightPane: React.FC = () => {
    const {mapOn} = React.useContext(MapContext);
    const [eventList, setEventList] = React.useState<EventResponseObject[]>([]);
    const positionState = React.useState<LatLng | null>(null);

    useEffect(() => {
        fetch(`${KINDER_BACK_URL}/event/all`).then(res => {
            if (res.ok) {
                res.text().then(value => {
                    console.log(value);
                    let jsonData: EventResponseObject[] = JSON.parse(value);
                    setEventList(jsonData);
                    console.log(eventList);
                })
            }
        })
    }, [])

    return (
        <div className="Right-pane col-sm p-0">
            <EventContext.Provider value={{eventList, setEventList, positionState}}>
                <div className="event-wrapper">
                    {mapOn ? <KinderMapApp/> : <ListApp/>}
                </div>
                <EventForm/>
            </EventContext.Provider>
        </div>
    )
}