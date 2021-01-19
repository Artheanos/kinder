import React from "react";
import {EventContext} from "./EventContext";

export const ListApp: React.FC = () => {
    const {eventList} = React.useContext(EventContext);

    return (
        <div className="container mt-3">
            <ul className="list-group">
                {
                    eventList.map(value =>
                        <li className="list-group-item">
                            <table><tbody>{
                                Object.entries(value).map(i =>
                                    <tr>
                                        <td>{i[0].toString()}</td>
                                        <td>{JSON.stringify(i[1])}</td>
                                    </tr>
                                )
                            }</tbody></table>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}