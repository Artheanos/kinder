import '../../App.css';
import React from "react";

import HelloWorldApp from "./HelloWorldApp";
import {RouteComponentProps} from "react-router";

function Home(props: RouteComponentProps) {
    return (
        <div className="Home">
            <HelloWorldApp/>
            <div className="container mt-5">
                <h3>You have successfully logged in</h3>
                <ul className="list-group">
                    {Object.keys(localStorage).map(
                        i => <li className="list-group-item" key={i}>{i} - {localStorage.getItem(i)}</li>
                    )}
                </ul>
                <button style={{margin: "0 5%"}} className="btn btn-warning" onClick={() => {
                    localStorage.clear();
                    sessionStorage.setItem('skipAnimation', 'true');
                    props.history.push('/');
                }}>
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default Home;
