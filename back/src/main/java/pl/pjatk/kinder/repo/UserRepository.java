package pl.pjatk.kinder.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.pjatk.kinder.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String Email);
    Optional<User> findByUrlId(String urlId);
    boolean existsByEmail(String email);
}
