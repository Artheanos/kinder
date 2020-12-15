package pl.pjatk.kinder.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.pjatk.kinder.category.CategoryService;
import pl.pjatk.kinder.entity.*;
import pl.pjatk.kinder.repo.AddressRepository;
import pl.pjatk.kinder.repo.PhotoRepository;
import pl.pjatk.kinder.repo.UserRepository;
import pl.pjatk.kinder.security.model.ResponseMessage;

import java.sql.Timestamp;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/event")
public class EventController {


    private EventService eventService;
    private CategoryService categoryService;
    private UserRepository userRepository;
    private PhotoRepository photoRepository;
    private AddressRepository addressRepository;

    @Autowired
    public EventController(EventService eventService, CategoryService categoryService,
                           UserRepository userRepository, PhotoRepository photoRepository,
                           AddressRepository addressRepository) {

        this.eventService = eventService;
        this.categoryService = categoryService;
        this.userRepository = userRepository;
        this.photoRepository = photoRepository;
        this.addressRepository = addressRepository;
    }


    @PostMapping
    public ResponseEntity addEvent(@RequestBody EventRequest req){
        //to do validation
        if (eventService.existsByTitle(req.getTitle())) {

            return ResponseEntity.badRequest().body(new ResponseMessage("Event with that name already exists"));
        }
        else {

            Timestamp startDate, endDate;
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            long userId = userRepository.findByEmail(userEmail).get().getId();

            //correct input date format yyyy-MM-dd HH:mm:ss.SSS
            try {

                startDate = Timestamp.valueOf(req.getStartDate());
                endDate = Timestamp.valueOf(req.getEndDate());
                Timestamp currentTime = new Timestamp(System.currentTimeMillis());


                if(startDate.after(endDate))
                    return ResponseEntity.badRequest().body(
                            new ResponseMessage("Start date cannot be earlier than end date"));


                if (currentTime.after(startDate) || currentTime.after(endDate))
                    return ResponseEntity.badRequest().body(
                            new ResponseMessage("You cannot add events that have already passed"));

            } catch (Exception e) { return ResponseEntity.badRequest().body(new ResponseMessage("Wrong date format")); }

            Address address = new Address(req.getAddress_name(), req.getLatitude(), req.getLongitude());
            addressRepository.save(address);

            Photo photo = new Photo(req.getPhoto_url());
            photoRepository.save(photo);

            Category category = categoryService.findByTitle(req.getCategory_title());

            //Default state = 'Waiting'
            eventService.save(new Event(req.getTitle(), address,
                    category, photo, req.getDescription(), startDate, endDate,
                    req.getCapacity(), State.Waiting, userRepository.findById(userId).get()
            ));

            return new ResponseEntity(new ResponseMessage("Event created"), HttpStatus.CREATED);
        }
    }


    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents(){
        var res = eventService.findAll();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<Event> getEventsByTitle(@PathVariable String title){
        if(eventService.existsByTitle(title))
            return new ResponseEntity<>(eventService.findByTitle(title), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
