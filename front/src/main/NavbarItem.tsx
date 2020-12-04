import {Link} from "react-router-dom";
import React from "react";

function NavbarItem(props: { to: string, title: string }) {
    return (
        <Link to={props.to} className={"nav-item" + (window.location.pathname === props.to ? ' active' : '')}>
            {props.title}
        </Link>
    );
}

export default NavbarItem;