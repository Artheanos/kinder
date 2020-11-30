import React from "react";
import {Route} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./home/Home";
import Profile from "./profile/Profile";

class Main extends React.Component {
    render() {
        return (
            <div className="Main">
                <Route path="/" component={Navbar}/>
                <Route path="/home" component={Home}/>
                <Route path="/profile/:profileId" component={Profile}/>
            </div>
        )
    }
}

export default Main;