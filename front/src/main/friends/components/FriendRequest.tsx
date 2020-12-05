import React from "react";
import {UserBasicObject} from "../FriendPage";

type FriendRequestProps = {
    user: UserBasicObject
}

class FriendRequest extends React.Component<FriendRequestProps> {

    constructor(props: FriendRequestProps, context: any) {
        super(props, context);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
    }

    accept() {
        fetch(`http://89.68.129.242:3080/friends/${this.props.user.urlId}/confirm`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.status === 200) {
                alert("OK")
            } else {
                alert("ERROR\n" + res.status)
            }
        })
    }

    decline() {
        fetch(`http://89.68.129.242:3080/friends/${this.props.user.urlId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.status === 200) {
                alert("OK")
            } else {
                alert("ERROR\n" + res.status)
            }
        })
    }

    render() {
        return (
            <div className="Friend-request">
                <h3>Friend request from {this.props.user.name + " " + this.props.user.surname}</h3>
                <button className="btn btn-success" onClick={this.accept}>Accept</button>
                <button className="btn btn-danger" onClick={this.decline}>Decline</button>
            </div>
        )
    }
}

export default FriendRequest;