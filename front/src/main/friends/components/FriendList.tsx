import React from "react";
import Friend from "./Friend";

type FriendListProps = {
    friends: Kinder.UserBasicObject[]
    setActiveUser?: (urlId: string) => any
}

const FriendList: React.FC<FriendListProps> = (props) => {
    return (
        <div className="Friend-list">
            <ul className="list-group">
                {
                    props.friends.length
                        ?
                        props.friends.map(value =>
                            <li className="list-group-item p-0" key={value.urlId} >
                                <Friend userBasic={value} setActiveUser={props.setActiveUser} />
                            </li>
                        )
                        :
                        props.children || null
                }
            </ul>
        </div>
    )
}

export default FriendList;