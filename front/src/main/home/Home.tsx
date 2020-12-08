import '../../App.css';
import React from "react";

import HelloWorldApp from "./HelloWorldApp";
import {RouteComponentProps} from "react-router";

function Home(props: RouteComponentProps) {
    return (
        <div className="Home">
            <button style={{margin: "0 5%"}} className="btn btn-warning" onClick={() => {
                localStorage.clear();
                sessionStorage.setItem('skipAnimation', 'true');
                props.history.push('/');
            }}>
                Log Out
            </button>
            <div className="jumbotron">
                <h1 className="display-4">You have successfully logged in</h1>
                <div style={{whiteSpace: "nowrap"}}>
                    {Object.keys(localStorage).map(
                        i => <h3 key={i}>{i} - {localStorage.getItem(i)}</h3>
                    )}
                </div>
            </div>
            <HelloWorldApp/>
        </div>
    )
}

export default Home;
