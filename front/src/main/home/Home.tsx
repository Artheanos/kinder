import React from "react";

import {RouteComponentProps} from "react-router";
import {LeftPane} from "./left/LeftPane";
import {MapContext} from "./MapSwitchContext";
import {RightPane} from "./right/RightPane";

function Home(props: RouteComponentProps) {
    const [mapOn, setMapOn] = React.useState(true);

    return (
        <MapContext.Provider value={{mapOn, setMapOn}}>
            <div className="Home container-fluid">
                <div className="row">
                    <LeftPane/>
                    <RightPane/>
                </div>
            </div>
        </MapContext.Provider>

        // <div className="Home container-fluid">
        //     <div className="row">
        //         <MapContext.Provider value={{mapOn, setMapOn}}>
        //             <LeftPane/>
        //             <RightPane/>
        //         </MapContext.Provider>
        //     </div>
        // </div>
    )
}

export default Home;
