import React, {FormEvent} from "react";
import {ProfileProps} from "../main/profile/Profile";
import ChatMessage from "./ChatMessage";
import {CompatClient, Stomp} from '@stomp/stompjs';
import {KINDER_BACK_URL, KINDER_BACK_WS_URL} from "../common/util";

type ChatPageState = {
    messages: JSX.Element[],
    inputValue: string
}

class ChatPage extends React.Component<ProfileProps, ChatPageState> {

    private client: CompatClient | null = null;
    private chatMessages: React.RefObject<HTMLDivElement> = React.createRef();

    constructor(props: ProfileProps, context: any) {
        super(props, context);
        this.state = {
            messages: [],
            inputValue: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.connect = this.connect.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount() {
        this.fetchMessages();
        this.connect();
    }

    componentDidUpdate(prevProps: Readonly<ProfileProps>, prevState: any, snapshot?: any) {
        if (prevProps.match.params.profileId !== this.props.match.params.profileId) {
            this.setState({
                messages: [],
                inputValue: ''
            });
            this.fetchMessages();
            this.client?.disconnect(this.connect);
        }
    }

    fetchMessages() {
        fetch(`${KINDER_BACK_URL}/messages/${localStorage.getItem('urlId')}/${this.props.match.params.profileId}/10`,).then(res => {
            res.text().then(resData => {
                let jsonData: any = JSON.parse(resData);
                if (jsonData.length) {
                    for (let messageObject of jsonData) {
                        let {message, senderId} = messageObject;
                        this.addMessage(message, senderId === localStorage.getItem('urlId'));
                    }
                    this.chatMessages.current?.scrollTo(0, this.chatMessages.current.scrollHeight);
                }
            })
        });
    }

    connect() {
        this.client = Stomp.client(`${KINDER_BACK_WS_URL}/chat`);

        this.client.connect({}, (frame: any) => {
                this.client!.subscribe(
                    "/topic/" + this.props.match.params.profileId,
                    (stompMessage) => {
                        let {senderId, message} = JSON.parse(stompMessage.body);
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
            recipientId
        }));
    }

    addMessage(text: string, imTheOwner: boolean = true) {
        let chatMessages = this.chatMessages.current!;
        let scrollDown = (chatMessages.scrollTop + chatMessages.clientHeight === chatMessages.scrollHeight);

        this.state.messages.push(<ChatMessage imTheOwner={imTheOwner} text={text} key={this.state.messages.length}/>);
        this.setState({
            ...(imTheOwner && {inputValue: ''})
        } as any);

        if (scrollDown) {
            this.chatMessages.current!.scrollTo(0, this.chatMessages.current!.scrollHeight);
        }
    }

    render() {
        return (
            <div className="Chat-page container">
                <h1>Chat with <i>{this.props.match.params.profileId}</i></h1>
                <div className="chat-column">
                    <div className="chat-messages" ref={this.chatMessages}>
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