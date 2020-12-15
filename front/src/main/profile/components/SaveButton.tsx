import React from "react";

export const SaveButton: React.FC<{ saving: boolean, onClick: any }> = (props) => {
    if (props.saving) {
        return (
            <button className="btn btn-success mr-5 loading" onClick={props.onClick}>
                Saving
            </button>
        )
    } else {
        return (
            <button className="btn btn-success mr-5" onClick={props.onClick}>
                Save
            </button>
        )
    }
}