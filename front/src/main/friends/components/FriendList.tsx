import React from "react";
import Friend from "./Friend";
import {UserBasicObject} from "../FriendPage";

function FriendList(props: { friends: UserBasicObject[] }) {
    return (
        <div className="Friend-list">
            {props.friends.map(value => <Friend userBasic={value} key={value.urlId}/>)}
        </div>
    )
}

export default FriendList;