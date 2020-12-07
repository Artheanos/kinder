package pl.pjatk.kinder.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pjatk.kinder.entity.Event;
import pl.pjatk.kinder.entity.State;
import pl.pjatk.kinder.repo.UserRepository;
import pl.pjatk.kinder.security.model.ResponseMessage;

import java.sql.Timestamp;

@RestController
@RequestMapping("/event")
public class EventController {


    private EventService eventService;
    private UserRepository userRepository;

    @Autowired
    public EventController(EventService eventService, UserRepository userRepository){
        this.eventService = eventService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity addEvent(@RequestBody EventRequest req){

        if(eventService.existsByTitle(req.getTitle()))
            return ResponseEntity.badRequest().body(new ResponseMessage("An event with that name already exists"));
        else {

            Timestamp startDate, endDate;
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            long userId = userRepository.findByEmail(userEmail).get().getId();

            //correct input date format yyyy-MM-dd HH:mm:ss.SSS
            try {
                startDate = Timestamp.valueOf(req.getStartDate());
                endDate = Timestamp.valueOf(req.getEndDate());

                Timestamp currentTime = new Timestamp(System.currentTimeMillis());
                if (currentTime.after(startDate) || currentTime.after(endDate)) {
                    return ResponseEntity.badRequest().body(new ResponseMessage("You cannot add events that have already passed"));
                }

            } catch (Exception e) {
                return ResponseEntity.badRequest().body(new ResponseMessage("Wrong date format"));
            }

            eventService.save(new Event(req.getTitle(), req.getAddres(), req.getDescription(),
                    startDate, endDate, req.getCapacity(), State.Waiting, userRepository.findById(userId).get()));

            return new ResponseEntity(new ResponseMessage("Event created"), HttpStatus.CREATED);
        }
    }


}