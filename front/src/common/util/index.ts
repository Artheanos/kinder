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

export * from './config';
export * from './randoms';
export * from './generic';
