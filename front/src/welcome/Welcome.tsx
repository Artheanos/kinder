import '../App.css';
import React from "react";

import TopBar from "./TopBar";
import {FirstPage, SecondPage} from './welcome_pages'
import {RouteComponentProps} from "react-router";

class Welcome extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div className="Welcome">
                <TopBar {...this.props}/>
                <FirstPage/>
                <SecondPage/>
            </div>
        );
    }
}

export default Welcome;
