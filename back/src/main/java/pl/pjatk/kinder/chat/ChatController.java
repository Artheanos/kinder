package pl.pjatk.kinder.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.repo.UserRepository;

@Controller
public class ChatController {

    private SimpMessagingTemplate messagingTemplate;
    private ChatRoomService chatRoomService;
    private ChatMessageService chatMessageService;
    private UserRepository userRepository;

    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate, ChatRoomService chatRoomService, ChatMessageService chatMessageService, UserRepository userRepository) {
        this.messagingTemplate = messagingTemplate;
        this.chatRoomService = chatRoomService;
        this.chatMessageService = chatMessageService;
        this.userRepository = userRepository;
    }

    @MessageMapping("/chat")
    public void get(@Payload Message message) {

        String chatId = chatRoomService.getChatRoomId(message.getSenderId(), message.getRecipientId());
        chatMessageService.save(chatId, message.getSenderId(), message.getRecipientId(), message.getMessage());
        this.messagingTemplate.convertAndSend("/topic/" + message.getSenderId(), new Message(message.getMessage(), message.getSenderId(), message.getRecipientId()));
        this.messagingTemplate.convertAndSend("/topic/" + message.getRecipientId(), new Message(message.getMessage(), message.getSenderId(), message.getRecipientId()));
    }

    @GetMapping("/messages/{senderUrlId}/{recipientUrlId}")
    public ResponseEntity<?> findMessages(@PathVariable String senderUrlId, @PathVariable String recipientUrlId) {
        return ResponseEntity.ok(chatMessageService.findChatMessages(senderUrlId, recipientUrlId));
    }


}
