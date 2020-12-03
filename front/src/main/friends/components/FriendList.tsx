import React from "react";
import Friend from "./Friend";
import {UserBasicObject} from "../FriendPage";

type FriendListState = {
    userBasics: UserBasicObject[]
}

class FriendList extends React.Component<{}, FriendListState> {

    constructor(props: {}, context: any) {
        super(props, context);
        this.state = {
            userBasics: []
        }
    }

    render() {
        return (
            <div className="Friend-list">
                {this.state.userBasics.map(value => <Friend userBasic={value}/>)}
            </div>
        )
    }
}

export default FriendList;