import React from "react";
import Friend from "./Friend";
import {UserBasicObject} from "../../../common/UserObjects";

function FriendList(props: { friends: UserBasicObject[], setActiveUser: (urlId: string) => any }) {
    return (
        <div className="Friend-list">
            <ul className="list-group">
                {props.friends.map(value => <Friend userBasic={value} key={value.urlId} setActiveUser={props.setActiveUser}/>)}
            </ul>
        </div>
    )
}

export default FriendList;