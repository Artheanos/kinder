import '../App.css';
import React from "react";

import {Redirect} from "react-router-dom";
import HelloWorldApp from "./HelloWorldApp";

class Home extends React.Component {
    render() {
        if (!localStorage.getItem('token')) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <div className="home-component">
                <div className="jumbotron">
                    <h1 className="display-4">You have successfully logged in
                        as <b>{localStorage.getItem('username')}</b>
                    </h1>
                    <div style={{whiteSpace: "nowrap"}}>
                        {Object.keys(localStorage).map(i => <h3>{i} - {localStorage.getItem(i)}</h3>)}
                    </div>
                </div>
                <button style={{margin: "0 5%"}} className="btn btn-warning" onClick={() => {
                    localStorage.clear();
                    this.props.history.push('/');
                }}>Log Out
                </button>
                <HelloWorldApp/>
            </div>
        )
    }
}

export default Home;
