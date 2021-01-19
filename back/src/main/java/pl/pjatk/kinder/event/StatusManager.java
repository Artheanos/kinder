package pl.pjatk.kinder.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.pjatk.kinder.entity.Event;
import pl.pjatk.kinder.entity.State;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
public class StatusManager {

    private EventRepository eventRepository;

    @Autowired
    public StatusManager(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Scheduled(fixedRate = 100000)
    public void checkStatus() {
        List<Event> events = StreamSupport.stream(eventRepository.findAll().spliterator(), false).collect(Collectors.toList());
        events.stream()
                .filter(e -> e.getState() == State.Waiting)
                .filter(e -> LocalDate.now().isAfter(LocalDate.parse(e.getStartDate(), DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss"))))
                .forEach(e -> e.setState(State.Active));
        eventRepository.saveAll(events);
    }


    @Scheduled(fixedRate = 200000)
    public void setEndedStatus() {
        List<Event> events = StreamSupport.stream(eventRepository.findAll().spliterator(), false).collect(Collectors.toList());
        events.stream()
                .filter(e -> e.getState() == State.Active)
                .filter(e -> LocalDate.now().isAfter(LocalDate.parse(e.getEndDate(), DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss"))))
                .forEach(e -> e.setState(State.Ended));
        eventRepository.saveAll(events);
    }

}
