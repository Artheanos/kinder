import React from "react";
import Friend from "./components/Friend";
import FriendList from "./components/FriendList";
import FriendRequest from "./components/FriendRequest";

export type UserBasicObject = {
    name: string,
    surname: string,
    urlId: string,
    photoUrl: string | null,
};

type FriendPageState = {
    friendList: React.RefObject<FriendList>,
    requestList: JSX.Element[]
}

class FriendPage extends React.Component<{}, FriendPageState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            friendList: React.createRef(),
            requestList: []
        }
    }

    componentDidMount() {
        fetch('http://89.68.129.242:3080/friends/' + localStorage.getItem('urlId')).then(res => {
            res.text().then(txt => {
                let values: UserBasicObject[] | null = JSON.parse(txt)['friends'];
                console.log('friends - ', values);
                if (values) {
                    this.state.friendList.current?.setState({userBasics: values})
                }
            })
        })

        this.getFriendRequests();
    }

    getFriendRequests() {
        fetch(`http://89.68.129.242:3080/friends/${localStorage.getItem('urlId')}/requests`, {
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
            <div className="Friend-page">
                <FriendList ref={this.state.friendList}/>
                <div className="friend-requests">
                    {this.state.requestList}
                </div>
            </div>
        )
    }
}

export default FriendPage;