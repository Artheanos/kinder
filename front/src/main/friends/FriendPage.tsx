import React, { useState, useEffect } from "react";
import FriendList from "./components/FriendList";
import { KINDER_BACK_URL } from "../../common/util";
import ChatPage from "./components/chat/ChatPage";
import { Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import FriendRequestList from "./components/friend_requests/FriendRequestList";
import { FriendRequestListContext } from "./components/friend_requests/FriendRequestListContext";
import { Col, Container, Row } from "react-bootstrap";
import SearchInput from "./components/friend_search/SearchInput";

function FriendPage(props: RouteComponentProps) {

    const [friendList, setFriendList] = useState<Kinder.UserBasicObject[]>([]);
    const [requestList, setRequestList] = useState<Kinder.UserBasicObject[]>([]);
    const [searchList, setSearchList] = useState<Kinder.UserBasicObject[]>([]);

    function setActiveUser(urlId: string) {
        props.history.push('/friends/' + urlId);
    }

    function fetchFriendRequests() {
        // setRequestList([{name: "Jan", surname: "Kowalski", urlId: "", photoUrl: ""}])

        fetch(`${KINDER_BACK_URL}/friends/requests`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res => {
            if (res.status === 200) {
                res.text().then(txt => {
                    let users: Kinder.UserBasicObject[] = JSON.parse(txt)['friends'];
                    setRequestList(users);
                })
            } else {
                alert("ERROR while fetching requests\nstatus " + res.status);
            }
        })
    }

    function fetchFriends() {
        fetch(`${KINDER_BACK_URL}/friends`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            res.text().then(txt => {
                let values: Kinder.UserBasicObject[] | null = JSON.parse(txt)['friends'];
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
            <Container className="py-3">
                <Row>
                    <Col lg="6" className="text-center">
                        <FriendRequestListContext.Provider value={{
                            onRespond: (urlId: string) => {
                                fetchFriends();
                                fetchFriendRequests();
                            }
                        }}>
                            <FriendRequestList requests={requestList} />
                        </FriendRequestListContext.Provider>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <h2>Find friends</h2>
                        <SearchInput setSearchList={setSearchList} />
                        <FriendList friends={searchList} />
                    </Col>
                </Row>
                {/*<div className="row">*/}
                {/*    <div className="col-4 text-center">*/}
                {/*        <FriendSearch/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Container>
            <Row>
                <Col sm="4" className="friend-page-left-pane">
                    <FriendList friends={friendList} setActiveUser={setActiveUser}>
                        <div>You have no friends :(</div>
                    </FriendList>
                </Col>
                <Col className="friend-page-right-pane p-0">
                    <Route path="/friends/:profileId" component={ChatPage} />
                    {/*<div className="vh-100 d-flex align-items-center justify-content-center">*/}
                    {/*    <h1>Chat</h1>*/}
                    {/*</div>*/}
                </Col>
            </Row>
        </div>
    )
}

export default FriendPage;
