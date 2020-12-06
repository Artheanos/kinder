import React from "react";
import FriendList from "./components/FriendList";
import FriendRequest from "./components/FriendRequest";
import FriendSearch from "./components/FriendSearch";
import {KINDER_BACK_URL} from "../../common/util";

export type UserBasicObject = {
    name: string,
    surname: string,
    urlId: string,
    photoUrl: string | null,
};

type FriendPageState = {
    friendList: UserBasicObject[],
    requestList: JSX.Element[]
}

class FriendPage extends React.Component<{}, FriendPageState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            friendList: [],
            requestList: []
        }
    }

    componentDidMount() {
        fetch(`${KINDER_BACK_URL}/friends/${localStorage.getItem('urlId')}`).then(res => {
            res.text().then(txt => {
                let values: UserBasicObject[] | null = JSON.parse(txt)['friends'];
                console.log('friends - ', values);
                if (values) {
                    this.setState({
                        friendList: values
                    })
                }
            })
        })

        this.getFriendRequests();
    }

    getFriendRequests() {
        fetch(`${KINDER_BACK_URL}/friends/${localStorage.getItem('urlId')}/requests`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res => {
            res.text().then(txt => {
                let users: UserBasicObject[] = JSON.parse(txt)['friends'];
                this.setState({
                    requestList: users.map(i => <FriendRequest user={i}/>)
                })
            })
        })
    }

    render() {
        return (
            <div className="Friend-page container">
                <FriendSearch/>
                <FriendList friends={this.state.friendList}/>
                <div className="friend-requests">
                    {this.state.requestList}
                </div>
            </div>
        )
    }
}

export default FriendPage;