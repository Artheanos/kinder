package pl.pjatk.kinder.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "subcategory", schema = "public")
public class Subcategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name="category_id", nullable=false)
    private Category category;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "event_subcategory",
            joinColumns = { @JoinColumn(name = "subcategory_id") },
            inverseJoinColumns = { @JoinColumn(name = "event_id") }
    )
    private List<Event> events;

    public Subcategory(){}

    public Subcategory(String title) {
        this.title = title;
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
}
