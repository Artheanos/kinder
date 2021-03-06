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