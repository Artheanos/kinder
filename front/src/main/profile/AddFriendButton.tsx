import React from 'react';
import {UserFullObject} from "./Profile";

function AddFriendButton(props: { profile: UserFullObject, isMe: boolean }) {
    function invite(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (props.profile) {
            fetch(`http://89.68.129.242:3080/friends/${props.profile.urlId}/add`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res => {
                if (res.status === 200) {
                    alert("User invited");
                } else {
                    alert("ERROR\n" + res.status)
                }
            })
        } else {
            alert("wait a bit")
        }
    }

    if (props.isMe) {
        return <div/>;
    } else {
        return (
            <div className="col justify-content-end d-flex">
                <button className="btn btn-dark" onClick={invite}>Add friend</button>
            </div>
        )
    }
}

export default AddFriendButton;