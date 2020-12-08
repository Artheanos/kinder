import React from "react";

export const MapSwitch: React.FC<{ value: boolean, onChange: any }> = (props) => {
    return (
        <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="map-switch" checked={props.value}
                   onChange={()=> props.onChange(!props.value)}/>
            <label className="custom-control-label" htmlFor="map-switch">
                List
            </label>
        </div>
    )
}