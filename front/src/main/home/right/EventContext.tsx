import React, {createContext, Dispatch, SetStateAction} from "react";
import {EventResponseObject} from "../../../common/EventObjects";
import {LatLng} from "leaflet";

export const EventContext = createContext<{
    positionState: [LatLng | null, Dispatch<SetStateAction<LatLng | null>>]
    eventList: EventResponseObject[],
    setEventList: (eventList: EventResponseObject[]) => any,
    myEventsState: [number[], Dispatch<SetStateAction<number[]>>]
}>({
    positionState: [null, function (p1: ((prevState: (LatLng | null)) => (LatLng | null)) | LatLng | null) {
    }],
    eventList: [],
    setEventList(eventList: EventResponseObject[]): any {
    },
    myEventsState: [[], function (p1: ((prevState: number[]) => number[]) | number[]) {
    }]
});