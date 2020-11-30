import {Link} from "react-router-dom";
import React from "react";

class NavbarItem extends React.Component<{ to: string, title: string }> {
    render() {
        return (
            <Link to={this.props.to} className={"nav-item" + (window.location.pathname === this.props.to ? ' active': '')}>
                {this.props.title}
            </Link>
        );
    }
}

export default NavbarItem;