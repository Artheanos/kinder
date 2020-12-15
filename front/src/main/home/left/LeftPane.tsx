import React from "react";
import {CustomSwitch} from "./CustomSwitch";
import {MapContext} from "../MapSwitchContext";

export const LeftPane: React.FC = () => {

    const {mapOn, setMapOn} = React.useContext(MapContext);

    return (
        <div className="Left-pane col-sm-3 p-4">
            <CustomSwitch label="Map" value={mapOn} setValue={setMapOn}/>
        </div>
    )
}