import React, {useEffect} from "react";
import {KinderMapApp} from "./map/KinderMapApp";
import {MapContext} from "../MapSwitchContext";
import {EventContext} from "./EventContext";
import {KINDER_BACK_URL} from "../../../common/util";
import {LatLng} from "leaflet";
import ListApp from "./list/ListApp";


export const RightPane: React.FC = () => {
    const {mapOn} = React.useContext(MapContext);
    const [eventList, setEventList] = React.useState<Kinder.EventResponseObject[]>([]);
    const myEventsState = React.useState<number[]>([]);
    const positionState = React.useState<LatLng | null>(null);

    useEffect(() => {
        fetch(`${KINDER_BACK_URL}/event/all`).then(res => {
            if (res.ok) {
                res.text().then(value => {
                    console.log(value);
                    let jsonData: Kinder.EventResponseObject[] = JSON.parse(value);
                    setEventList(jsonData);
                    console.log(eventList);
                })
            }
        })

        fetch(`${KINDER_BACK_URL}/event/participation`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.ok) {
                res.text().then(value => {
                    let jsonData: Kinder.EventResponseObject[] = JSON.parse(value);
                    myEventsState[1](jsonData.map(i => i.id))
                })
            }
        })
    }, [])

    return (
        <div className="Right-pane col-sm p-0">
            <EventContext.Provider value={{eventList, setEventList, positionState, myEventsState}}>
                <div className="event-wrapper h-100">
                    {mapOn ? <KinderMapApp/> : <ListApp/>}
                </div>
            </EventContext.Provider>
        </div>
    )
}