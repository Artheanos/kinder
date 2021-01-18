package pl.pjatk.kinder.entity;

import javax.persistence.*;

@Entity
@Table(name = "photo")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String url;

    @OneToOne(mappedBy = "photo", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch=FetchType.EAGER)
    private Event event;

    public Photo() {
    }

    public Photo(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
