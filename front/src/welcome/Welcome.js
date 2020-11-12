import '../App.css';
import React from "react";

import TopBar from "./TopBar";
import {FirstPage, SecondPage} from './welcome_pages'

class Welcome extends React.Component {
    render() {
        return (
            <div className="Welcome">
                <TopBar/>
                <FirstPage/>
                <SecondPage/>
            </div>
        );
    }
}

export default Welcome;
