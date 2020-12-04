import '../../App.css';
import React from "react";

import HelloWorldApp from "./HelloWorldApp";
import {RouteComponentProps} from "react-router";

class Home extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div className="Home">
                <button style={{margin: "0 5%"}} className="btn btn-warning" onClick={() => {
                    localStorage.clear();
                    sessionStorage.setItem('skipAnimation', 'true');
                    this.props.history.push('/');
                }}>
                    Log Out
                </button>
                <div className="jumbotron">
                    <h1 className="display-4">You have successfully logged in
                        as <b>{localStorage.getItem('username')}</b>
                    </h1>
                    <div style={{whiteSpace: "nowrap"}}>
                        {Object.keys(localStorage).map(i => <h3>{i} - {localStorage.getItem(i)}</h3>)}
                    </div>
                    {/*{fetch('http://192.168.1')}*/}
                </div>
                <HelloWorldApp/>
            </div>
        )
    }
}

export default Home;
