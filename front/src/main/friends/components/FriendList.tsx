import React from "react";
import Friend from "./Friend";
import {UserBasicObject} from "../../../common/UserObjects";

function FriendList(props: { friends: UserBasicObject[], setActiveUser: (urlId: string) => any }) {
    return (
        <div className="Friend-list">
            <ul className="list-group">
                {
                    props.friends.length
                        ?
                        props.friends.map(value =>
                            <li className="list-group-item p-0" key={value.urlId} >
                                <Friend userBasic={value} setActiveUser={props.setActiveUser}/>
                            </li>
                        )
                        :
                        <div>You have no friends :(</div>
                }
            </ul>
        </div>
    )
}

export default FriendList;