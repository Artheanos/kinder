package pl.pjatk.kinder.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "event", schema = "public")
public class Event {

    enum State{
        Active,
        Ended,
        Suspended,
        Held,
        Waiting
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String addres;
    private String description;
    private Timestamp startDate;
    private Timestamp endDate;
    private int capacity;
    private State state;
    private Integer user_id;

    @ManyToMany(mappedBy = "event")
    private List<User> users = new ArrayList<>();

    @OneToOne(mappedBy = "event")
    private Ticket ticket;

    public Event(){}

    public Event(Long id, String title, String addres, String description, Timestamp startDate, Timestamp endDate, int capacity, State state) {
        this.id = id;
        this.title = title;
        this.addres = addres;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.capacity = capacity;
        this.state = state;
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

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public Timestamp getEndDate() {
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
}
