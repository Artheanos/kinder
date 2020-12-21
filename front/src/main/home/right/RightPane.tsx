import React, {createContext, useEffect} from "react";
import {KinderMapApp} from "./KinderMapApp";
import {ListApp} from "./ListApp";
import {MapContext} from "../MapSwitchContext";
import {EventContext} from "./EventContext";
import {EventBasicObject} from "../../../common/EventObjects";

export const RightPane: React.FC = () => {
    const {mapOn} = React.useContext(MapContext);
    const [eventList, setEventList] = React.useState<Partial<EventBasicObject>[]>([]);

    useEffect(() => {
        // setEventList([{
        //     title: 'Tance polamance',
        //     lat: 54.42681988010237,
        //     lng: 18.571529388427738
        // }, {
        //     title: 'picko',
        //     lat: 54.43256158213563,
        //     lng: 18.582859039306644
        // }])
    }, [])

    return (
        <div className="Right-pane col-sm p-0">
            <EventContext.Provider value={{eventList, setEventList}}>
                <div className="event-wrapper">
                    {mapOn ? <KinderMapApp/> : <ListApp/>}
                </div>
            </EventContext.Provider>
        </div>
    )
}