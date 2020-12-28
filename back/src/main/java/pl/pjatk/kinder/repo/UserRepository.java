package pl.pjatk.kinder.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.pjatk.kinder.entity.User;
import java.util.List;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String Email);
    Optional<User> findByUrlId(String urlId);

    @Query("SELECT u FROM User u where concat(u.name, ' ', u.surname) like %:query%")
    List<User> findByQuery(@Param("query") String query);

    boolean existsByEmail(String email);
}
