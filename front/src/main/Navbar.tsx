import React from "react";
import NavbarItem from "./NavbarItem";

function Navbar() {
    return (
        <div className="Navbar">
            <nav>
                <a className="nav-item font-weight-bold" href="/home">Kinder</a>
                <NavbarItem title="Home" to="/home"/>
                <NavbarItem title="Profile" to={`/profile/${localStorage.getItem('urlId')}`}/>
                <NavbarItem title="Settings" to={`/settings`}/>
                <NavbarItem title="Friends" to={`/friends`}/>
                <NavbarItem title="Categories" to={`/categories`}/>
            </nav>
        </div>
    )
}

export default Navbar;