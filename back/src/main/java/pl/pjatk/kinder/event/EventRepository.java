package pl.pjatk.kinder.event;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.pjatk.kinder.entity.Event;

import java.util.Optional;


@Repository
public interface EventRepository extends CrudRepository<Event, Long> {

    Optional<Event> findEventByTitle(String title);
    boolean existsByTitle(String title);
}
