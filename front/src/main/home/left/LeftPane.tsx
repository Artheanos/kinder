import React from "react";
import {CustomSwitch} from "./CustomSwitch";
import {MapContext} from "../MapSwitchContext";

export const LeftPane: React.FC = () => {

    const {mapOn, setMapOn} = React.useContext(MapContext);

    return (
        <div className="Left-pane col-sm-3 p-4">
            <CustomSwitch label="Map" value={mapOn} setValue={setMapOn}/>
            <button style={{margin: "0 5%"}} className="btn btn-warning" onClick={() => {
                localStorage.clear();
                sessionStorage.setItem('skipAnimation', 'true');
                window.location.replace('/');
                // props.history.push('/');
            }}>
                Log Out
            </button>
        </div>
    )
}