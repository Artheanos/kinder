type OSMObject = {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    // noinspection SpellCheckingInspection
    boundingbox: [
        string,
        string,
        string,
        string,
    ],
    lat: string,
    lon: string,
    display_name: string,
    class: string,
    type: string,
    importance: number
};

namespace Kinder {
    type EventBasicObject = {
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

    type EventResponseObject = {
        id: number,
        title: string,
        description: string,
        startDate: string,
        endDate: string,
        capacity: number,
        state: string,
        address: {
            address_name: string,
            latitude: number,
            longitude: number
        },
        photo: { url: string } | null,
        eventCreator: Kinder.UserBasicObject,
        participants: Kinder.UserBasicObject[]
    }

    type UserBasicObject = {
        name: string,
        surname: string,
        urlId: string,
        photoUrl: string | null,
    };

    type UserFullObject = {
        name: string,
        surname: string,
        urlId: string,
        photoUrl: string | null,
        description: string | null,
        city: string | null,
    };

    type Category = {
        id: number,
        title: string,
        description: string
    }
}