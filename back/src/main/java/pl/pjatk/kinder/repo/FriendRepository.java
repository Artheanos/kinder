package pl.pjatk.kinder.repo;

import org.springframework.data.repository.CrudRepository;
import pl.pjatk.kinder.entity.Friend;

import java.util.Optional;

public interface FriendRepository extends CrudRepository<Friend, Long> {

    Optional<Friend> findByUserIdAndFriendId(Long userId, Long friendId);
}
