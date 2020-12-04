import {Link} from "react-router-dom";
import React from "react";

function SettingsChoice(props: { to: string, className?: string, children: React.ClassicElement<any>[] }) {
    return (
        <Link to={props.to} className={props.className + (window.location.pathname === props.to ? ' active' : '')}>
            {props.children[(window.location.pathname === props.to ? 0 : 1)]}
        </Link>
    );
}

export default SettingsChoice;