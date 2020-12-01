package pl.pjatk.kinder.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void get(@Payload Message chatMessage) {
        this.messagingTemplate.convertAndSend("/topic/" + chatMessage.getSenderId(), new Message(chatMessage.getMessage(), chatMessage.getSenderId(), chatMessage.getRecipientId()));
        this.messagingTemplate.convertAndSend("/topic/" + chatMessage.getRecipientId(), new Message(chatMessage.getMessage(), chatMessage.getSenderId(), chatMessage.getRecipientId()));
    }

}
