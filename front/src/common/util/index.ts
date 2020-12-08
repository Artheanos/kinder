import default_image from '../../main/profile/default_image.jpg';

// export const KINDER_BACK_IP = '89.68.129.242';
export const KINDER_BACK_IP = '192.168.1.93';
export const KINDER_BACK_PORT = 3080
export const KINDER_BACK_URL = `http://${KINDER_BACK_IP}:${KINDER_BACK_PORT}`;
export const KINDER_BACK_WS_URL = `ws://${KINDER_BACK_IP}:${KINDER_BACK_PORT}`;

export const KINDER_FRONT_URL = `http://${KINDER_BACK_IP}:${3000}`;

// export const KINDER_FRONT_URL = 'http://localhost:3000';

export function randomInt(min: number, max: number) {
    if (max === undefined) {
        [min, max] = [0, min];
    }
    return Math.random() * (max - min + 1) + min >> 0;
}

export function randomString(length: number) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += String.fromCharCode(randomInt(65, 126))
    }
    return result;
}

export function capitalize(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
}

export function photoUrl(photoId: string | null) {
    if (photoId)
        return `${KINDER_BACK_URL}/photos/${photoId}`;
    else
        return default_image;
}

export function profileUrl(urlId: string) {
    return `${KINDER_FRONT_URL}/profile/${urlId}`;
}

export function chatUrl(urlId: string) {
    return `${KINDER_FRONT_URL}/chat/${urlId}`;
}