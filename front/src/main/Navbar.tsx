import React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import NavbarItem from "./NavbarItem";

type NavbarState = {
    homeButton: React.RefObject<NavbarItem>,
    profileButton: React.RefObject<NavbarItem>,
}

class Navbar extends React.Component<RouteComponentProps, NavbarState> {
    constructor(props: RouteComponentProps, context: any) {
        super(props, context);
        this.state = {
            homeButton: React.createRef(),
            profileButton: React.createRef(),
        }
        // this.activate = this.activate.bind(this);
    }

    // activate(e: any) {
    //     this.state.homeButton.current!.classList.remove('active');
    //     this.state.profileButton.current!.classList.remove('active');
    //     e.target.classList.add('active');
    // }

    render() {
        return (
            <div className="Navbar">
                <nav>
                    <a className="nav-item font-weight-bold" href="/home">Kinder</a>
                    <NavbarItem title="Home" to="/home" ref={this.state.homeButton}/>
                    <NavbarItem title="Profile" to={`/profile/${localStorage.getItem('email')}`}
                                ref={this.state.profileButton}/>
                    {/*<Link to="/home" className={"nav-item"} ref={this.state.homeButton} onClick={this.activate}>*/}
                    {/*    Home*/}
                    {/*</Link>*/}
                    {/*<Link to={`/profile/${localStorage.getItem('email')}`} className="nav-item"*/}
                    {/*      ref={this.state.profileButton} onClick={this.activate}>*/}
                    {/*    Profile*/}
                    {/*</Link>*/}
                </nav>
            </div>
        )
    }
}

export default Navbar;