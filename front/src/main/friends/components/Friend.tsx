import React, {PropsWithChildren} from "react";
import {photoUrl, profileUrl} from "../../../common/util";
import {Link} from "react-router-dom";
import {UserBasicObject} from "../../../common/UserObjects";

type FriendProps = {
    userBasic: UserBasicObject,
    setActiveUser?: (urlId: string) => any
}

const Friend: React.FC<PropsWithChildren<FriendProps>> = (props) => {
    return (
        <div className="Friend d-flex justify-content-start p-4"
             onClick={() => props.setActiveUser ? props.setActiveUser(props.userBasic.urlId) : null}>
            <div className="img-wrapper mr-2">
                <a className="ml-auto" href={profileUrl(props.userBasic.urlId)} target="_blank"
                   rel="noopener noreferrer">
                    <img src={photoUrl(props.userBasic.photoUrl)} alt={props.userBasic.name}/>
                </a>
            </div>
            <div className="name mr-2">
                {props.userBasic.name}
            </div>
            {props.children}
        </div>
    )
}

export default Friend;