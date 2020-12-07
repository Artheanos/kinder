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
    private String addres;
    private String description;
    private Timestamp startdate;
    private Timestamp enddate;
    private int capacity;
    private State state;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


   //@ManyToMany(mappedBy = "events")
   // private List<User> users = new ArrayList<>();



    @OneToMany(mappedBy = "event")
    private List<Ticket> tickets;

    @ManyToMany(mappedBy = "events")
    private List<Subcategory> subcategories;

    public Event(){}

    public Event(String title, String addres, String description, Timestamp startdate, Timestamp enddate, int capacity, State state, User user) {
        this.title = title;
        this.addres = addres;
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

    public String getAddres() {
        return addres;
    }

    public void setAddres(String addres) {
        this.addres = addres;
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

   // public List<User> getUsers() {
    //    return users;
    //}

    //public void setUsers(List<User> users) {
   //     this.users = users;
    //}

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public List<Subcategory> getSubcategories() {
        return subcategories;
    }

    public void setSubcategories(List<Subcategory> subcategories) {
        this.subcategories = subcategories;
    }


}
