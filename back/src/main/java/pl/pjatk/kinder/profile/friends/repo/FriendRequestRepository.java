package pl.pjatk.kinder.profile.friends.repo;

import org.springframework.data.repository.CrudRepository;
import pl.pjatk.kinder.profile.friends.model.entity.FriendRequest;

import javax.transaction.Transactional;
import java.util.List;

public interface FriendRequestRepository extends CrudRepository<FriendRequest, Long> {

    boolean existsByUserIdAndFriendId(Long userId, Long friendId);
    @Transactional
    void deleteByUserIdAndFriendId(Long userId, Long friendId);
    List<FriendRequest> findAllByFriendId(Long id);
}
