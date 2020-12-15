package pl.pjatk.kinder.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.repo.UserRepository;

@Service
public class ChatRoomService {

    private ChatRoomRepository chatRoomRepository;
    private UserRepository userRepository;

    @Autowired
    public ChatRoomService(ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    public String getChatRoomId(String senderUrlId, String recipientUrlId) {

        User sender = userRepository.findByUrlId(senderUrlId).get();
        User recipient = userRepository.findByUrlId(recipientUrlId).get();

        if (!chatRoomRepository.existsBySenderIdAndRecipientId(sender.getId(), recipient.getId()) && !chatRoomRepository.existsBySenderIdAndRecipientId(recipient.getId(), sender.getId())) {
            String chatId = String.format("%s_%s", sender.getId(), recipient.getId());
            chatRoomRepository.save(new ChatRoom(chatId, sender, recipient));
            chatRoomRepository.save(new ChatRoom(chatId, recipient, sender));
            return chatId;
        } else {
            return chatRoomRepository.findBySenderIdAndRecipientId(sender.getId(), recipient.getId()).getChatId();
        }
    }

}
