package pl.pjatk.kinder.repo;

import org.springframework.data.repository.CrudRepository;
import pl.pjatk.kinder.entity.Friend;

public interface FriendRepository extends CrudRepository<Friend, Long> {
}
