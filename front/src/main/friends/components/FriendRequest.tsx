import React from "react";
import {KINDER_BACK_URL} from "../../../common/util";
import {UserBasicObject} from "../../../common/UserObjects";

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
        fetch(`${KINDER_BACK_URL}/friends/${this.props.user.urlId}/confirm`, {
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
        fetch(`${KINDER_BACK_URL}/friends/${this.props.user.urlId}`, {
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