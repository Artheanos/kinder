import React, {FormEvent} from "react";
import {ProfileProps} from "../../../profile/Profile";
import ChatMessage from "./ChatMessage";
import {CompatClient, Stomp} from '@stomp/stompjs';
import {KINDER_BACK_URL, KINDER_BACK_WS_URL} from "../../../../common/util";

type ChatPageState = {
    messages: JSX.Element[],
    inputValue: string,
}

type MessageObject = {
    message: string,
    senderId: string,
    recipientId: string,
}

class ChatPage extends React.Component<ProfileProps, ChatPageState> {

    private client: CompatClient | null = null;
    private chatMessages: React.RefObject<HTMLDivElement> = React.createRef();
    private pageNumber = 0;

    constructor(props: ProfileProps, context: any) {
        super(props, context);
        this.state = {
            messages: [],
            inputValue: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.connect = this.connect.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount() {
        this.fetchMessages(0);
        this.connect();
    }

    componentDidUpdate(prevProps: Readonly<ProfileProps>, prevState: any, snapshot?: any) {
        if (prevProps.match.params.profileId !== this.props.match.params.profileId) {
            this.setState({
                messages: [],
                inputValue: ''
            });
            this.fetchMessages(0);
            this.client?.disconnect(this.connect);
        }
    }

    fetchMessages(page: number) {
        let prevScrollHeight = this.chatMessages.current!.scrollHeight;
        fetch(
            `${KINDER_BACK_URL}/messages/${this.props.match.params.profileId}/${page}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }
            }
        ).then(res => {
            res.text().then(resData => {
                let jsonData: MessageObject[] = JSON.parse(resData);
                if (jsonData.length) {
                    let msgs = jsonData.map(i =>
                        <ChatMessage text={i.message} imTheOwner={i.senderId === localStorage.getItem('urlId')}/>
                    );
                    this.setState({
                        messages: msgs.concat(this.state.messages)
                    })
                    if (this.pageNumber === 0) {
                        this.chatMessages.current?.scrollTo(0, this.chatMessages.current.scrollHeight);
                    } else {
                        this.chatMessages.current?.scrollTo(0, this.chatMessages.current?.scrollHeight - prevScrollHeight);
                    }
                } else {
                    this.pageNumber = -1;
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

    handleScroll(e: React.UIEvent<HTMLElement>) {
        let chatMessages = this.chatMessages.current;
        if (chatMessages) {
            if (this.pageNumber !== -1 && chatMessages.scrollTop === 0) {
                this.fetchMessages(++this.pageNumber);
            }
        }
    }

    addMessage(text: string, imTheOwner: boolean) {
        let scrollDown = false;
        let chatMessages = this.chatMessages.current;
        if (chatMessages) {
            scrollDown = (chatMessages.scrollTop + chatMessages.clientHeight >= chatMessages.scrollHeight - 3);
        }

        let newMessage = <ChatMessage imTheOwner={imTheOwner} text={text} key={this.state.messages.length}/>;

        this.setState({
            messages: this.state.messages.concat(newMessage),
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
                    <div className="chat-messages" ref={this.chatMessages} onScroll={this.handleScroll}>
                        {this.state.messages}
                    </div>
                    <div className="chat-input">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" className="form-control" value={this.state.inputValue}
                                   onChange={(x) => {
                                       this.setState({inputValue: x.target.value});
                                   }}
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPage;