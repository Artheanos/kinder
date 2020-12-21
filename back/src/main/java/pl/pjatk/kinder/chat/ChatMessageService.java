package pl.pjatk.kinder.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.repo.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatMessageService {

    private ChatMessageRepository chatMessageRepository;
    private ChatRoomService chatRoomService;
    private UserRepository userRepository;

    @Autowired
    public ChatMessageService(ChatMessageRepository chatMessageRepository, ChatRoomService chatRoomService, UserRepository userRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomService = chatRoomService;
        this.userRepository = userRepository;
    }

    public void save(String chatId, String senderUrlId, String recipientUrlId, String content) {
        User sender = userRepository.findByUrlId(senderUrlId).get();
        User recipient = userRepository.findByUrlId(recipientUrlId).get();
        ChatMessage message = new ChatMessage(chatId, sender, recipient, content);
        chatMessageRepository.save(message);
    }

    public List<Message> findChatMessages(String senderId, String recipientId, int pageSize) {
        String chatId = chatRoomService.getChatRoomId(senderId, recipientId);
        int numberOfMessages = chatMessageRepository.countAllByChatId(chatId);
        //Pageable pageable = PageRequest.of(numberOfMessages/pageSize, pageSize);
        List<ChatMessage> messages = chatMessageRepository.findAllByChatIdDesc(chatId);
        return messages.stream().map(e -> new Message(e.getContent(), e.getSender().getUrlId(), e.getRecipient().getUrlId())).collect(Collectors.toList());
    }
}
