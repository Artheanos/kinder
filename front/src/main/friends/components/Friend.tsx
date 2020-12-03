import React from "react";
import {UserBasicObject} from "../FriendPage";

type FriendProps = {
    userBasic: UserBasicObject
    // name: string,
    // surname: string,
    // pictureId: string,
}

class Friend extends React.Component<FriendProps> {
    render() {
        return (
            <div className="Friend" style={{border: 'solid 1px black'}}>
                {this.props.userBasic.name}
                {this.props.userBasic.surname}
                {this.props.userBasic.urlId}
                {this.props.userBasic.photoUrl}
                {/*<h3>{this.props.name}</h3>*/}
                {/*<h3>{this.props.surname}</h3>*/}
            </div>
        )
    }
}

export default Friend;