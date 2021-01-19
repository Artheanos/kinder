package pl.pjatk.kinder.event;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.pjatk.kinder.entity.Event;
import java.util.List;
import java.util.Optional;


@Repository
public interface EventRepository extends CrudRepository<Event, Long> {

    Event findEventByTitle(String title);
    List<Event> findAllByTitle(String title);
    Event findEventByCategory(String category);
    Event findEventById(Long id);
    boolean existsByTitle(String title);
    boolean existsByCategory(String category);
    boolean existsById(Long id);
    void deleteById(Long id);
}
