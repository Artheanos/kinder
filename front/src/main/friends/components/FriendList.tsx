import React from "react";
import Friend from "./Friend";
import {UserBasicObject} from "../../../common/UserObjects";

function FriendList(props: { friends: UserBasicObject[] }) {
    return (
        <div className="Friend-list">
            <ul className="list-group">
                {props.friends.map(value => <Friend userBasic={value} key={value.urlId}/>)}
            </ul>
        </div>
    )
}

export default FriendList;