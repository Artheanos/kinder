import {createContext} from "react";


export const MapContext = createContext({
    mapOn: true,
    setMapOn: (value: boolean) => {
    }
});