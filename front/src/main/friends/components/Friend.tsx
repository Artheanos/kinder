import React from "react";
import {photoUrl, profileUrl} from "../../../common/util";
import {Link} from "react-router-dom";
import {UserBasicObject} from "../../../common/UserObjects";

type FriendProps = {
    userBasic: UserBasicObject,
    setActiveUser?: (urlId: string) => any
}

function Friend(props: FriendProps) {
    return (
        <li className="Friend d-flex list-group-item justify-content-start"
            onClick={() => props.setActiveUser ? props.setActiveUser(props.userBasic.urlId) : null}>
            <div className="img-wrapper mr-2">
                <img src={photoUrl(props.userBasic.photoUrl)} alt={props.userBasic.name}/>
            </div>
            <Link to={'profile/' + props.userBasic.urlId} style={{
                color: 'black',
                textDecoration: 'none'
            }}>
                <div className="name mr-2" style={{border: "none"}}>
                    {props.userBasic.name}
                </div>
            </Link>
            <a className="ml-auto" href={profileUrl(props.userBasic.urlId)} target="_blank"
               rel="noopener noreferrer">
                Profile
            </a>
            {/*<h3>{this.props.name}</h3>*/}
            {/*<h3>{this.props.surname}</h3>*/}
        </li>
    )
}

export default Friend;