package pl.pjatk.kinder.event;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.pjatk.kinder.entity.Category;
import pl.pjatk.kinder.entity.Event;
import pl.pjatk.kinder.entity.State;

import java.util.List;
import java.util.Optional;


@Repository
public interface EventRepository extends CrudRepository<Event, Long> {

    List<Event> findAllByTitle(String title);
    List<Event> findEventByCategory(Category category);
    Event findEventById(Long id);
    boolean existsByTitle(String title);
    boolean existsByCategory(Category category);
    boolean existsById(Long id);
    void deleteById(Long id);
}
