import React from 'react';
import {KINDER_BACK_URL} from "../../../common/util";
import {UserBasicObject, UserFullObject} from "../../../common/UserObjects";

const AddFriendButton: React.FC<{ profile: UserFullObject, isMe: boolean }> = ({profile, isMe}) => {

    const [isMyFriend, setFriend] = React.useState(true);

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
                    alert("User invited");
                } else {
                    alert("ERROR\n" + res.status)
                }
            })
        } else {
            alert("wait a bit")
        }
    }

    React.useEffect(() => {
        fetch(`${KINDER_BACK_URL}/friends/${localStorage.getItem('urlId')}`).then(res => {
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

    if (isMe || isMyFriend) {
        return null;
    } else {
        return (
            <div className="col justify-content-end d-flex">
                <button className="btn btn-dark" onClick={invite}>Add friend</button>
            </div>
        )
    }
};

export default AddFriendButton;