import React from "react";
import FriendRequest from "./FriendRequest";

const FriendRequestList: React.FC<{ requests: Kinder.UserBasicObject[] }> = ({requests}) => {
    if (requests.length) {
        return (
            <div>
                <h2 className="my-3">Friend requests</h2>
                <div className="friend-requests order-warning">
                    {requests.map(i => <FriendRequest user={i}/>)}
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default FriendRequestList;