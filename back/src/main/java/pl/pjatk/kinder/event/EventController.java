package pl.pjatk.kinder.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.pjatk.kinder.category.CategoryService;
import pl.pjatk.kinder.entity.*;
import pl.pjatk.kinder.repo.AddressRepository;
import pl.pjatk.kinder.repo.UserRepository;
import pl.pjatk.kinder.security.model.ResponseMessage;
import pl.pjatk.kinder.services.PhotoService;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/event")
public class EventController {


    private EventService eventService;
    private CategoryService categoryService;
    private UserRepository userRepository;
    private PhotoService photoService;
    private AddressRepository addressRepository;

    @Autowired
    public EventController(EventService eventService, CategoryService categoryService, UserRepository userRepository,
                           PhotoService photoService, AddressRepository addressRepository) {

        this.eventService = eventService;
        this.categoryService = categoryService;
        this.userRepository = userRepository;
        this.photoService = photoService;
        this.addressRepository = addressRepository;
    }


    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addEvent(@RequestPart(value = "file", required = false) MultipartFile file,
                                      @RequestPart("data") EventRequest req) throws IOException, NoSuchAlgorithmException {

            //userEmail and userId needed for assign event for currently logged user
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            long userId = userRepository.findByEmail(userEmail).get().getId();

            //Timestamps for checking if event date is correct and LocalDate -> Timestamp conversion
            Timestamp eventStartDate, eventEndDate, currentDate;
            eventStartDate = Timestamp.valueOf(req.getStartDate());
            eventEndDate = Timestamp.valueOf(req.getEndDate());
            currentDate = new Timestamp(System.currentTimeMillis());

            //Event date validation
            if (eventStartDate.after(eventStartDate))
                return new ResponseEntity<>(
                        new ResponseMessage("The event start date must be earlier than the event end date"),
                        HttpStatus.BAD_REQUEST
                );
            else if (currentDate.after(eventStartDate) || currentDate.after(eventEndDate)) {
                return new ResponseEntity<>(
                        new ResponseMessage("The start and end date of the event cannot be later than the current date."),
                        HttpStatus.BAD_REQUEST
                );
            }
            else {

                try {
                    Address address = addressRepository.save(new Address(req.getAddress_name(), req.getLatitude(), req.getLongitude()));
                    Category category = categoryService.findByTitle(req.getCategory_title());
                    Photo photo;
                    if(file != null) photo = photoService.save(file);
                    else photo = null;
                    eventService.save(new Event(req.getTitle(), address,
                            category, photo, req.getDescription(), eventStartDate, eventEndDate,
                            req.getCapacity(), State.Waiting, userRepository.findById(userId).get()
                    ));

                    return new ResponseEntity<>(new ResponseMessage("Event successfully added"), HttpStatus.CREATED);
                } catch (Exception e){
                    System.out.println(e);
                    e.printStackTrace();
                    return new ResponseEntity<>(new ResponseMessage("Something went wrong"), HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
    }

    @DeleteMapping
    public ResponseEntity<?> removeEvent(@RequestParam Long id){
        if(eventService.existsById(id)){
            Event eventToRemove = eventService.findById(id);
            User loggedUser = userRepository.findByEmail(SecurityContextHolder.getContext().
                    getAuthentication().getName()).get();
            if (loggedUser.getUrlId() == eventToRemove.getEventCreator().getUrlId() ||
                    loggedUser.getRole() == Role.ROLE_ADMIN){
                eventService.remove(eventToRemove.getId());
                return new ResponseEntity<>(HttpStatus.OK);
            }
            else return new ResponseEntity<>(
                    new ResponseMessage("An event can only be deleted by the owner or administrator."),
                    HttpStatus.UNAUTHORIZED);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents(){
        var res = eventService.findAll();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @GetMapping("/title/{title}")
    public ResponseEntity<List<Event>> getEventsByTitle(@PathVariable String title){
        if(eventService.existsByTitle(title))
            return new ResponseEntity<>(eventService.findAllByTitle(title), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<Event> getEventsByCategory(@PathVariable String category){
        if(eventService.existsByCategory(category))
            return new ResponseEntity<>(eventService.findByCategory(category), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
