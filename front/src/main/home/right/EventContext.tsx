import React, {createContext, Dispatch, SetStateAction} from "react";
import {EventResponseObject} from "../../../common/EventObjects";
import {LatLng} from "leaflet";

export const EventContext = createContext<{
    positionState: [LatLng | null, Dispatch<SetStateAction<LatLng | null>>]
    eventList: Partial<EventResponseObject>[],
    setEventList: (eventList: Partial<EventResponseObject>[]) => any,
}>({
    positionState: [null, function (p1: ((prevState: (LatLng | null)) => (LatLng | null)) | LatLng | null) {
    }],
    eventList: [],
    setEventList(eventList: Partial<EventResponseObject>[]): any {
    }
});