import {UserBasicObject} from "./UserObjects";

export type EventBasicObject = {
    title: string,
    address: string,
    lat: number,
    lng: number,
    description: string,
    startDate: Date,
    endDate: Date,
    capacity: string,
    state: string,
}

export type EventResponseObject = {
    "id": number,
    "title": string,
    "description": string,
    "startDate": string,
    "endDate": string,
    "capacity": number,
    "state": string,
    "address": {
        "address_name": string,
        "latitude": number,
        "longitude": number
    },
    "photo": { url: string } | null,
    "eventCreator": UserBasicObject,
    "participants": UserBasicObject[]
}
