package pl.pjatk.kinder.entity;

import javax.persistence.*;

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
