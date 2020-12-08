import React from "react";
import {UserBasicObject} from "../FriendPage";
import {chatUrl, photoUrl, profileUrl} from "../../../common/util";

type FriendProps = {
    userBasic: UserBasicObject
}

function Friend(props: FriendProps) {
    return (
        <div className="Friend" style={{border: 'solid 1px black'}}>
            <p>{props.userBasic.name}</p>
            <p>{props.userBasic.surname}</p>
            <a href={profileUrl(props.userBasic.urlId)}>Go to profile</a>
            <a href={chatUrl(props.userBasic.urlId)} target="_blank" rel="noopener noreferrer">Chat</a>
            <img src={photoUrl(props.userBasic.photoUrl)} alt={props.userBasic.name}/>
            {/*<h3>{this.props.name}</h3>*/}
            {/*<h3>{this.props.surname}</h3>*/}
        </div>
    )
}

export default Friend;