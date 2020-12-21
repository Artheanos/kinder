import React from "react";
import '../../../custom-switches-res.css'

export const CustomSwitch: React.FC<{ label: string, value: any, setValue: (value: any) => void }> = (props) => {

    return (
        <div className="custom-control custom-switch custom-switch-md">
            <input type="checkbox" className="custom-control-input" id={`map-switch-${props.label}`}
                   checked={props.value}
                   onChange={() => props.setValue(!props.value)}/>
            <label className="custom-control-label" htmlFor={`map-switch-${props.label}`}>
                {props.label}
            </label>
        </div>
    )
}