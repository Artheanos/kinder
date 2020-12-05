import React, {FormEvent} from "react";
import {ProfileProps} from "../main/profile/Profile";
import ChatMessage from "./ChatMessage";

type ChatPageState = {
    messages: JSX.Element[],
    inputValue: string
}

class ChatPage extends React.Component<ProfileProps, ChatPageState> {
    constructor(props: ProfileProps, context: any) {
        super(props, context);
        this.state = {
            messages: [],
            inputValue: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();
        this.addMessage(this.state.inputValue)
    }

    addMessage(text: string) {
        this.setState({
            messages: this.state.messages.concat(<ChatMessage imTheOwner={true} text={text}/>),
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