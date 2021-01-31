import React from "react";
import Friend from "./Friend";

function FriendList(props: { friends: Kinder.UserBasicObject[], setActiveUser: (urlId: string) => any }) {
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