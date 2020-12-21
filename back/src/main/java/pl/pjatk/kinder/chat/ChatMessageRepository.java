package pl.pjatk.kinder.chat;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface ChatMessageRepository extends CrudRepository<ChatMessage, Long> {

    List<ChatMessage> findAllByChatIdDesc(String chatId);
    int countAllByChatId(String chatId);
}
