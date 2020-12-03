import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";
import NotFound from "../common/NotFound";
import FriendPage from "./friends/FriendPage";

class Main extends React.Component {
    render() {
        if (!localStorage.getItem('token')) {
            return (
                <Redirect to="/"/>
            )
        }
        return (
            <div className="Main">
                <Route path="/" component={Navbar}/>
                <Route path="/home" component={Home}/>
                <Route path="/profile/:profileId" component={Profile}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/friends" component={FriendPage}/>
            </div>
        )
    }
}

export default Main;