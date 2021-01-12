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
import java.security.Principal;
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
    public EventController(EventService eventService, CategoryService categoryService,
                           UserRepository userRepository, PhotoService photoService,
                           AddressRepository addressRepository) {

        this.eventService = eventService;
        this.categoryService = categoryService;
        this.userRepository = userRepository;
        this.photoService = photoService;
        this.addressRepository = addressRepository;
    }


    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addEvent(@RequestPart(value = "file", required = false) MultipartFile file, @RequestPart("data") EventRequest req) throws IOException, NoSuchAlgorithmException {
        //todo: validation and photo for event

        if (eventService.existsByTitle(req.getTitle())) {

            return ResponseEntity.badRequest().body(new ResponseMessage("Event with that name already exists"));
        }
        else {

            String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            long userId = userRepository.findByEmail(userEmail).get().getId();
            Timestamp startdate;
            Timestamp enddate;

            try {

                Timestamp currentDate = new Timestamp(System.currentTimeMillis());

                startdate = Timestamp.valueOf(req.getStartDate());
                enddate = Timestamp.valueOf(req.getEndDate());


                if(startdate.after(enddate))
                    return ResponseEntity.badRequest().body(
                            new ResponseMessage("Start date cannot be earlier than end date"));


                if (currentDate.after(startdate) || currentDate.after(enddate))
                    return ResponseEntity.badRequest().body(
                            new ResponseMessage("You cannot add events that have already passed"));

            } catch (Exception e) { return ResponseEntity.badRequest().body(new ResponseMessage("Wrong date format")); }

            Address address = new Address(req.getAddress_name(), req.getLatitude(), req.getLongitude());


            Category category;
            if(categoryService.existsByTitle(req.getCategory_title()))
                category = categoryService.findByTitle(req.getCategory_title());
            else
                category = null;

                addressRepository.save(address);


                Photo photo;
                if (file != null) {
                    photo = photoService.save(file);
                }
                else photo = null;


                //Default state = 'Waiting'
                eventService.save(new Event(req.getTitle(), address,
                        category, photo, req.getDescription(), startdate, enddate,
                        req.getCapacity(), State.Waiting, userRepository.findById(userId).get()
                ));

            return new ResponseEntity(new ResponseMessage("Event created"), HttpStatus.CREATED);
        }
    }


    @GetMapping("/all")
    public ResponseEntity<?> getAllEvents(){
        var res = eventService.findAll();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<Event> getEventsByTitle(@PathVariable String title){
        if(eventService.existsByTitle(title))
            return new ResponseEntity<>(eventService.findByTitle(title), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
