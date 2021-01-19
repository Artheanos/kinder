package pl.pjatk.kinder.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.pjatk.kinder.entity.Event;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.profile.details.BasicUserInfoResponse;
import pl.pjatk.kinder.repo.UserRepository;
import pl.pjatk.kinder.security.model.ResponseMessage;


@RestController
@CrossOrigin("*")
@RequestMapping("/event/participation")
public class EventParticipationController {


    private EventService eventService;
    private UserRepository userRepository;

    @Autowired
    public EventParticipationController(EventService eventService, UserRepository userRepository) {
        this.eventService = eventService;
        this.userRepository = userRepository;
    }


    @PostMapping
    public ResponseEntity<?> joinEvent(@RequestParam Long id){
        if(eventService.existsById(id)){
            User loggedUser = userRepository.findByEmail(SecurityContextHolder.getContext().
                    getAuthentication().getName()).get();
            Event event = eventService.findById(id);
            if(loggedUser.getUrlId() != event.getEventCreator().getUrlId()){
                for (BasicUserInfoResponse x : event.getParticipants()){
                    if (x.getUrlId() == loggedUser.getUrlId()){
                        return new ResponseEntity<>(
                                new ResponseMessage("You already participate in that event."),
                                HttpStatus.CONFLICT);
                    }
                }
                event.addParticipant(loggedUser);
                eventService.save(event);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            else return new ResponseEntity<>(
                    new ResponseMessage("You cannot participate in an event, if you are it's creator."),
                    HttpStatus.CONFLICT);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @DeleteMapping
    public ResponseEntity<?> leaveEvent(@RequestParam Long id){
        if(eventService.existsById(id)){
            User loggedUser = userRepository.findByEmail(SecurityContextHolder.getContext().
                    getAuthentication().getName()).get();
            Event event = eventService.findById(id);

            for (BasicUserInfoResponse x : event.getParticipants()){
                if (x.getUrlId() == loggedUser.getUrlId()){
                    event.removeParticipant(loggedUser);
                    eventService.save(event);
                    return new ResponseEntity<>(HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(
                    new ResponseMessage("You are not participating in this event."),
                    HttpStatus.CONFLICT);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping
    public ResponseEntity<?> getAttendedEvents(){
        User loggedUser = userRepository.findByEmail(SecurityContextHolder.getContext().
                getAuthentication().getName()).get();
        var events = loggedUser.getAttendedEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

}
