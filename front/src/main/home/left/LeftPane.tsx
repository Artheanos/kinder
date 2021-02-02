import React from "react";
import {CustomSwitch} from "./CustomSwitch";
import {MapContext} from "../MapSwitchContext";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export const LeftPane: React.FC = () => {

    const {mapOn, setMapOn} = React.useContext(MapContext);

    return (
        <div className="Left-pane col-sm-3 p-4">
            <CustomSwitch label="Map" value={mapOn} setValue={setMapOn}/>
            <Button as={Link} to="/new-event">Create Event</Button>
            <Button variant="warning" style={{margin: "0 5%"}} onClick={() => {
                localStorage.clear();
                sessionStorage.setItem('skipAnimation', 'true');
                window.location.replace('/');
                // props.history.push('/');
            }}>
                Log Out
            </Button>
        </div>
    )
}