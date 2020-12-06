import React, {FormEvent} from "react";
import {ProfileProps} from "../main/profile/Profile";
import ChatMessage from "./ChatMessage";
import {Client, CompatClient, Stomp} from '@stomp/stompjs';

type ChatPageState = {
    messages: JSX.Element[],
    inputValue: string
}

class ChatPage extends React.Component<ProfileProps, ChatPageState> {

    private client: CompatClient | null = null;

    constructor(props: ProfileProps, context: any) {
        super(props, context);
        this.state = {
            messages: [],
            inputValue: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.connect = this.connect.bind(this);
        this.connect();
    }

    connect() {
        this.client = Stomp.client('ws://192.168.1.93:3080/chat');

        this.client.connect({}, (frame: any) => {
                this.client!.subscribe(
                    "/topic/" + this.props.match.params.profileId,
                    (stompMessage) => {
                        console.log('i got msg', stompMessage);
                        let {senderId, recipientId, message} = JSON.parse(stompMessage.body);
                        this.addMessage(message, senderId === localStorage.getItem('urlId'));
                    })
            }
        )
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (this.client === null) {
            alert("Stomp client is null");
            return;
        }

        let messageToSend = this.state.inputValue;
        let myId = localStorage.getItem('urlId');
        let recipientId = this.props.match.params.profileId;
        this.client.send("/app/chat", {}, JSON.stringify({
            'message': messageToSend,
            'senderId': myId,
            'recipientId': recipientId
        }));
    }

    addMessage(text: string, imTheOwner: boolean = true) {
        this.setState({
            messages: this.state.messages.concat(<ChatMessage imTheOwner={imTheOwner} text={text}/>),
            inputValue: '',
        });
    }

    render() {
        return (
            <div className="Chat-page container">
                <h1>Chat with <i>{this.props.match.params.profileId}</i></h1>
                <div className="chat-column">
                    <div className="chat-messages">
                        {this.state.messages}
                    </div>
                    <div className="chat-input">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" className="form-control" value={this.state.inputValue}
                                   onChange={(x) => {
                                       this.setState({inputValue: x.target.value});
                                   }}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPage;