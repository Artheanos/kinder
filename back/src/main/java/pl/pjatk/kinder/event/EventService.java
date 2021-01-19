package pl.pjatk.kinder.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pjatk.kinder.entity.Event;

import java.util.ArrayList;
import java.util.List;


@Service
public class EventService {

    private EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }


    public List<Event> findAll(){
        List<Event> events = new ArrayList<>();
        eventRepository.findAll()
                .forEach(events::add);
        return events;
    }

    public Event findByTitle(String title){
        return eventRepository.findEventByTitle(title);
    }

    public Event findByCategory(String category) {return eventRepository.findEventByCategory(category);}

    public Event findById(Long id) { return eventRepository.findEventById(id);}

    public List<Event> findAllByTitle(String title) { return eventRepository.findAllByTitle(title);}

    public boolean existsByTitle(String title){
        return eventRepository.existsByTitle(title);
    }

    public boolean existsByCategory(String category) {return eventRepository.existsByCategory(category);}

    public boolean existsById(Long id){ return eventRepository.existsById(id);}

    public void save(Event event){
        eventRepository.save(event);
    }

    public void remove(Long id) { eventRepository.deleteById(id);}
}
