import default_image from '../../main/profile/default_image.jpg';

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

export function profileUrl(urlId: string) {
    return 'http://localhost:3000/profile/' + urlId;
}

export function photoUrl(photoId: string | null) {
    if (photoId)
        return 'http://89.68.129.242:3080/photos/' + photoId;
    else
        return default_image;
}

export function chatUrl(urlId: string) {
    return 'http://localhost:3000/chat/' + urlId;
}