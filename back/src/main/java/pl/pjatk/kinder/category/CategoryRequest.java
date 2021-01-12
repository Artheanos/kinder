package pl.pjatk.kinder.category;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import javax.persistence.*;

@Component
@RequestScope
@Entity
@Table(name = "category")
public class CategoryRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;

    public CategoryRequest(){}

    public CategoryRequest(String title){
        this.title = title;
    }

    public CategoryRequest(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public CategoryRequest(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
