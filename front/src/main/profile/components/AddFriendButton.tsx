import React from 'react';
import {KINDER_BACK_URL} from "../../../common/util";
import {UserBasicObject, UserFullObject} from "../../../common/UserObjects";

function AddFriendButton(props: { profile: UserFullObject, isMe: boolean }) {
    function invite(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (props.profile) {
            fetch(`${KINDER_BACK_URL}/friends/${props.profile.urlId}/add`, {
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

    const [isMyFriend, setFriend] = React.useState(true);

    React.useEffect(() => {
        fetch(`${KINDER_BACK_URL}/friends/${localStorage.getItem('urlId')}`).then(res => {
            res.text().then(txt => {
                let values: UserBasicObject[] | null = JSON.parse(txt)['friends'];
                if (values) {
                    setFriend(
                        values.filter(f => f.urlId === props.profile.urlId).length !== 0
                    )
                }
            })
        })
    })

    if (props.isMe || isMyFriend) {
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