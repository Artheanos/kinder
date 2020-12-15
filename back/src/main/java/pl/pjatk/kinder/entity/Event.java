package pl.pjatk.kinder.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;


@Entity
@Table(name = "event", schema = "public")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    private Timestamp startdate;
    private Timestamp enddate;
    private int capacity;
    private State state;

    @OneToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "photo_id")
    private Photo photo;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "event")
    private List<Ticket> tickets;


    public Event(){}

    public Event(String title, Address address, Category category, Photo photo, String description,
                 Timestamp startdate, Timestamp enddate, int capacity, State state, User user) {

        this.title = title;
        this.address = address;
        this.category = category;
        this.photo = photo;
        this.description = description;
        this.startdate = startdate;
        this.enddate = enddate;
        this.capacity = capacity;
        this.state = state;
        this.user = user;
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

    public Timestamp getStartdate() {
        return startdate;
    }

    public void setStartdate(Timestamp startDate) {
        this.startdate = startDate;
    }

    public Timestamp getEnddate() {
        return enddate;
    }

    public void setEnddate(Timestamp endDate) {
        this.enddate = endDate;
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

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

}
