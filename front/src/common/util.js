export function randomSequence(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += String.fromCharCode(randint(65, 126))
    }
    return result;
}

export function randint(min, max) {
    if (max === undefined) {
        [min, max] = [0, min];
    }
    return Math.random() * (max - min + 1) + min >> 0;
}