import React, {useContext} from "react";
import {KINDER_BACK_URL} from "../../../../common/util";
import {UserBasicObject} from "../../../../common/UserObjects";
import Friend from "../Friend";
import {FriendRequestListContext} from "./FriendRequestListContext";

type FriendRequestProps = {
    user: UserBasicObject
}

const FriendRequest: React.FC<FriendRequestProps> = ({user}) => {

    const {onRespond} = useContext(FriendRequestListContext);

    function accept() {
        fetch(`${KINDER_BACK_URL}/friends/${user.urlId}/confirm`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.status === 200) {
                alert("OK");
                onRespond(user.urlId);
            } else {
                alert("ERROR\n" + res.status)
            }
        });
    }

    function decline() {
        fetch(`${KINDER_BACK_URL}/friends/${user.urlId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.status === 200) {
                alert("OK")
                onRespond(user.urlId);
            } else {
                alert("ERROR\n" + res.status)
            }
        })
    }

    return (
        <div className="Friend-request">
            <Friend userBasic={user}>
                <div className="ml-auto d-flex justify-content-center">
                    <button className="btn btn-success" onClick={accept}>✓</button>
                    <button className="btn btn-danger" onClick={decline}>✗</button>
                </div>
            </Friend>
        </div>
    )
}

export default FriendRequest;