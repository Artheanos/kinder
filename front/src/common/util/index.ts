import default_image from '../../main/profile/default_image.jpg';
import {KINDER_BACK_URL, KINDER_FRONT_URL} from "./config";

export function photoUrl(photoId: string | null) {
    if (photoId)
        return `${KINDER_BACK_URL}/photos/${photoId}`;
    else
        return default_image;
}

export function profileUrl(urlId: string) {
    return `${KINDER_FRONT_URL}/profile/${urlId}`;
}

export function myDateFormat(date: Date) {
    return date.toISOString().replace('T', ' ').replace(/:\d+.\d+Z/, '');
}


export async function addressToLocation(address: string) {
    try {
        let response = await fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURI(address));
        return await response.text();
    } catch (e) {
        alert(e);
    }
}

export async function locationToAddress(lat: string | number, lng: string | number): Promise<OSMObject> {
    try {
        let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`, {
            headers: {
                'accept-language': 'pl'
            }
        });
        return JSON.parse(await response.text());
    } catch (e) {
        throw e;
    }
}

export * from './config';
export * from './randoms';
export * from './generic';
