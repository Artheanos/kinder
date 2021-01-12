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

    public boolean existsByTitle(String title){
        return eventRepository.existsByTitle(title);
    }
    
    public void save(Event event){
        eventRepository.save(event);
    }
}
