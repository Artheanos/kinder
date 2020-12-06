import React from "react";
import Friend from "./Friend";
import {UserBasicObject} from "../../../common/UserObjects";

function FriendList(props: { friends: UserBasicObject[] }) {
    return (
        <ul className="Friend-list list-group">
            {props.friends.map(value => <Friend userBasic={value} key={value.urlId}/>)}
        </ul>
    )
}

export default FriendList;