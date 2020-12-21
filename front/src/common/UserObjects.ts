export type UserBasicObject = {
    name: string,
    surname: string,
    urlId: string,
    photoUrl: string | null,
};

export type UserFullObject = {
    name: string,
    surname: string,
    urlId: string,
    photoUrl: string | null,
    description: string | null,
    city: string | null,
};