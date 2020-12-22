export function Array_remove<T>(arr: T[], item: T) {
    let index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

export function String_capitalize(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
}