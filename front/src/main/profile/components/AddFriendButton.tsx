import React, {useState} from 'react';
import {KINDER_BACK_URL} from "../../../common/util";
import {UserBasicObject, UserFullObject} from "../../../common/UserObjects";

const AddFriendButton: React.FC<{ profile: UserFullObject, isMe: boolean }> = ({profile, isMe}) => {

        const [isMyFriend, setFriend] = useState(true);
        const [invited, setInvited] = useState(false);

        function invite(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            if (profile) {
                fetch(`${KINDER_BACK_URL}/friends/${profile.urlId}/add`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                }).then(res => {
                    if (res.status === 200) {
                        setInvited(true);
                    } else if (res.status === 400) {
                        setInvited(true);
                    } else {
                        alert("ERROR\n" + res.status)
                    }
                })
            } else {
                alert("ERR")
            }
        }

        function remove(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            if (profile) {
                fetch(`${KINDER_BACK_URL}/friends/${profile.urlId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                }).then(res => {
                    if (res.status === 200) {
                        alert("User removed");
                    } else {
                        alert("ERROR\n" + res.status)
                    }
                })
            } else {
                alert("ERR")
            }
        }

        React.useEffect(() => {
            fetch(`${KINDER_BACK_URL}/friends`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res => {
                res.text().then(txt => {
                    let users: UserBasicObject[] | null = JSON.parse(txt)['friends'];
                    if (users) {
                        setFriend(
                            users.filter(u => u.urlId === profile.urlId).length !== 0
                        )
                    }
                })
            })
        })

        if (isMe) {
            return null;
        } else if (invited) {
            return (
                <div className="col justify-content-end d-flex">
                    <button className="btn disabled">Invited</button>
                </div>
            )
        } else if (isMyFriend) {
            return (
                <div className="col justify-content-end d-flex">
                    <button className="btn btn-danger" onClick={remove}>Unfriend</button>
                </div>
            )
        } else {
            return (
                <div className="col justify-content-end d-flex">
                    <button className="btn btn-dark" onClick={invite}>Add friend</button>
                </div>
            )
        }
    }
;

export default AddFriendButton;