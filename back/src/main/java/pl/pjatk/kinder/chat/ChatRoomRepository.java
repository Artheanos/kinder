package pl.pjatk.kinder.chat;

import org.springframework.data.repository.CrudRepository;
import pl.pjatk.kinder.entity.User;

public interface ChatRoomRepository extends CrudRepository<ChatRoom, Long> {

    boolean existsBySenderIdAndRecipientId(Long senderId, Long recipientId);
    ChatRoom findBySenderIdAndRecipientId(Long senderId, Long recipientId);
}
