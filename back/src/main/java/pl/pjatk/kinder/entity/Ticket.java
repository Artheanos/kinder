package pl.pjatk.kinder.entity;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ticket_id;

    private String title;
    private Double price;
    private Timestamp startDate;
    private Timestamp endDate;


    public Ticket(){}

    public Ticket(Long id, String title, Double price, Timestamp startDate, Timestamp endDate) {
        this.ticket_id = id;
        this.title = title;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() {
        return ticket_id;
    }

    public void setId(Long id) {
        this.ticket_id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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
}