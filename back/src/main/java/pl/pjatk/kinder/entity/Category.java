package pl.pjatk.kinder.entity;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "category", schema = "public")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Event> events;

    public Category(){}

    public Category(String title, String description) {
        this.title = title;
        this.description = description;
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
}
