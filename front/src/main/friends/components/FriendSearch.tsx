import React, {FormEvent} from "react";
import FriendList from "./FriendList";
import {UserBasicObject} from "../FriendPage";

type FriendSearchState = {
    searchQuery: string,
    friendsFound: UserBasicObject[]
}

class FriendSearch extends React.Component<{}, FriendSearchState> {

    constructor(props: {}, context: any) {
        super(props, context);
        this.state = {
            searchQuery: '',
            friendsFound: [],
        }
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();
        // this.state.friendList.current!.setState()
    }

    render() {
        return (
            <div className="Friend-search">
                <form onSubmit={this.handleSubmit}>
                    <input type="text"/>
                    <button className="btn btn-primary">
                        Find a friend
                    </button>
                </form>
                <div className="friends-found">
                    <FriendList friends={this.state.friendsFound}/>
                </div>
            </div>
        )
    }

}

export default FriendSearch;
