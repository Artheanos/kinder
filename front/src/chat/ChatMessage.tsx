import React from "react";

function ChatMessage(props: { text: string, imTheOwner: boolean }) {
    return (
        <p className={'message ' + (props.imTheOwner ? 'me' : 'someone')}>{props.text}</p>
    );
}

export default ChatMessage;