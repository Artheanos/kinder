import React, {FormEvent} from "react";
import FriendList from "./FriendList";

type FriendSearchState = {
    searchQuery: string,
    friendList: React.RefObject<FriendList>
}

class FriendSearch extends React.Component<{}, FriendSearchState> {

    constructor(props: {}, context: any) {
        super(props, context);
        this.state = {
            searchQuery: '',
            friendList: React.createRef()
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
                    <button className="btn btn-primary"/>
                </form>
                {this.state.friendList}
            </div>
        )
    }
}

export default FriendSearch;
