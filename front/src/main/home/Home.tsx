import '../../App.css';
import React from "react";

import {RouteComponentProps} from "react-router";
import {HomeApp} from "./HomeApp";
import {MapSwitch} from "./MapSwitch";

function Home(props: RouteComponentProps) {
    const [mapOn, setMapOn] = React.useState(false);

    return (
        <div className="Home row">
            <div className="col border-right">
                <MapSwitch onChange={setMapOn} value={mapOn}/>
            </div>
            <div className="col p-0">
                {mapOn ? <div>nothing</div> : <HomeApp/>}
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
        </div>
    )
}

export default Home;
