import React, {PropsWithChildren} from "react";
import {photoUrl, profileUrl} from "../../../common/util";

type FriendProps = {
    userBasic: Kinder.UserBasicObject,
    setActiveUser?: (urlId: string) => any
}

const Friend: React.FC<PropsWithChildren<FriendProps>> = (props) => {
    return (
        <div className="Friend d-flex justify-content-start p-4"
             onClick={() => props.setActiveUser ? props.setActiveUser(props.userBasic.urlId) : null}>
            <a href={profileUrl(props.userBasic.urlId)} target="_blank"
               rel="noopener noreferrer">
                <div className="img-wrapper mr-2">

                    <img src={photoUrl(props.userBasic.photoUrl)} alt={props.userBasic.name}/>
                </div>
            </a>
            <div className="name mr-2">
                {props.userBasic.name}
            </div>
            {props.children}
        </div>
    )
}

export default Friend;