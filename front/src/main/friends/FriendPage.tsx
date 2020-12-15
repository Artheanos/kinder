import React, {useState, useEffect} from "react";
import FriendList from "./components/FriendList";
import FriendRequest from "./components/FriendRequest";
import FriendSearch from "./components/FriendSearch";
import {KINDER_BACK_URL} from "../../common/util";
import {UserBasicObject} from "../../common/UserObjects";
import ChatPage from "../../chat/ChatPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {RouteComponentProps} from "react-router";

function FriendPage(props: RouteComponentProps) {

    const [friendList, setFriendList] = useState<UserBasicObject[]>([]);
    const [requestList, setRequestList] = useState<JSX.Element[]>([]);

    // const [activeUser] = useState<string>("");

    function setActiveUser(urlId: string) {
        props.history.push('/friends/' + urlId);
    }

    function fetchFriendRequests() {
        fetch(`${KINDER_BACK_URL}/friends/requests`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res => {
            if (res.status === 200) {
                res.text().then(txt => {
                    let users: UserBasicObject[] = JSON.parse(txt)['friends'];
                    setRequestList(
                        users.map(i => <FriendRequest user={i}/>)
                    );
                })
            } else {
                alert("ERROR while fetching requests\nstatus " + res.status);
            }
        })
    }

    function fetchFriends() {
        fetch(`${KINDER_BACK_URL}/friends/${localStorage.getItem('urlId')}`).then(res => {
            res.text().then(txt => {
                let values: UserBasicObject[] | null = JSON.parse(txt)['friends'];
                console.log('friends - ', values);
                if (values) {
                    setFriendList(values);
                }
            })
        })
    }

    useEffect(() => {
        fetchFriends();
        fetchFriendRequests();
    }, []);

    return (
        <div className="Friend-page container-fluid p-0">
            <div className="row">
                <div className="friend-requests">
                    {requestList}
                </div>
            </div>
            <div className="row">
                <FriendSearch/>
            </div>
            <div className="row">
                <div className="friend-page-left-pane col-4">
                    <FriendList friends={friendList} setActiveUser={setActiveUser}/>
                </div>
                <div className="friend-page-right-pane col p-0">
                    <Route path="/friends/:profileId" component={ChatPage}/>
                    {/*<div className="vh-100 d-flex align-items-center justify-content-center">*/}
                    {/*    <h1>Chat</h1>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default FriendPage;
