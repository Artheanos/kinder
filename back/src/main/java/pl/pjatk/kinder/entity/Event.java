package pl.pjatk.kinder.entity;

import pl.pjatk.kinder.profile.details.BasicUserInfoResponse;

import javax.persistence.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "event", schema = "public")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    @Column(name = "startdate")
    private Timestamp startDate;
    @Column(name = "enddate")
    private Timestamp endDate;
    private int capacity;
    private State state;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User eventCreator;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_event",
            joinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private List<User> participants = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "photo_id")
    private Photo photo;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "event")
    private List<Ticket> tickets= new ArrayList<>();


    public Event(){}

    public Event(String title, Address address, Category category, Photo photo, String description,
                 Timestamp startDate, Timestamp endDate, int capacity, State state, User eventCreator) {

        this.title = title;
        this.address = address;
        this.category = category;
        this.photo = photo;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.capacity = capacity;
        this.state = state;
        this.eventCreator = eventCreator;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStartDate(){
        String startDate = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(this.startDate);
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        String endDate = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(this.endDate);
        return endDate;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getCategory() {
        return category.getTitle();
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Photo getPhoto() {
        return photo;
    }

    public void setPhoto(Photo photo) {
        this.photo = photo;
    }

    public BasicUserInfoResponse getEventCreator() {
        Photo photo = eventCreator.getPhoto();
        BasicUserInfoResponse eventCreatorInfo = new BasicUserInfoResponse(
                eventCreator.getName(), eventCreator.getSurname(), eventCreator.getUrlId(),
                photo != null ? photo.getUrl() : null);
        return eventCreatorInfo;
    }

    public void addParticipant(User user) {
        this.participants.add(user);
    }

    public void removeParticipant(User user){
        this.participants.remove(user);
    }

    public List<BasicUserInfoResponse> getParticipants(){
        List<BasicUserInfoResponse> participantsInfo  = new ArrayList<>();
        for (User user : participants){
            participantsInfo.add(new BasicUserInfoResponse(user.getName(), user.getSurname(),
                    user.getUrlId(), user.getPhoto() != null ? user.getPhoto().getUrl() : null));
        }
        return participantsInfo;
    }

}
