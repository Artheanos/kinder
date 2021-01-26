import React from "react";
import {Redirect, Route} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";
import FriendPage from "./friends/FriendPage";
import CategoryPage from "./admin/CategoryPage";
import {CategoryFilter} from "./admin/CategoryFilter";
import EventPage from "./eventpage/EventPage";

const Main: React.FC = () => {
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
            <Route path="/event/:eventId" component={EventPage}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/friends" component={FriendPage}/>
            <Route path="/categories" component={CategoryFilter as any}/>
        </div>
    )
};

export default Main;