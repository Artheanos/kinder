import {createContext} from "react";
import {EventBasicObject} from "../../../common/EventObjects";

let emptyArray: Partial<EventBasicObject>[] = [];

export const EventContext = createContext({
    eventList: emptyArray,
    setEventList: (eventList: Partial<EventBasicObject>[]) => {
    }
});