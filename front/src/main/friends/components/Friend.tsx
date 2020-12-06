import React from "react";
import {chatUrl, photoUrl} from "../../../common/util";
import {Link} from "react-router-dom";
import {UserBasicObject} from "../../../common/UserObjects";

type FriendProps = {
    userBasic: UserBasicObject
}

function Friend(props: FriendProps) {
    return (
        <li className="Friend d-flex list-group-item">
            <div className="img-wrapper">
                <img src={photoUrl(props.userBasic.photoUrl)} alt={props.userBasic.name}/>
            </div>
            <Link to={'profile/' + props.userBasic.urlId} style={{
                color: 'black',
                textDecoration: 'none'
            }}>
                <h3>{props.userBasic.name} {props.userBasic.surname}</h3>
            </Link>
            <a href={chatUrl(props.userBasic.urlId)} target="_blank" rel="noopener noreferrer">Chat</a>
            {/*<h3>{this.props.name}</h3>*/}
            {/*<h3>{this.props.surname}</h3>*/}
        </li>
    )
}

export default Friend;