package pl.pjatk.kinder.event;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.pjatk.kinder.entity.Event;
import pl.pjatk.kinder.entity.State;

import java.util.List;
import java.util.Optional;


@Repository
public interface EventRepository extends CrudRepository<Event, Long> {

    Event findEventByTitle(String title);
    Event findEventByCategory(String category);
    boolean existsByTitle(String title);
    boolean existsByCategory(String category);
    void deleteById(Long id);
    List<Event> findAllByState(State state);
}
