package pl.pjatk.kinder.profile.friends.repo;

import org.springframework.data.repository.CrudRepository;
import pl.pjatk.kinder.profile.friends.model.entity.Friend;

import java.util.Optional;

public interface FriendRepository extends CrudRepository<Friend, Long> {

    Optional<Friend> findByUserIdIdAndFriendIdId(Long userId, Long friendId);
    boolean existsByUserIdIdAndFriendIdId(Long userId, Long friendId);
}
