import {createContext} from "react";


export const FriendRequestListContext = createContext({
    onRespond: (urlId: string) => {}
});
