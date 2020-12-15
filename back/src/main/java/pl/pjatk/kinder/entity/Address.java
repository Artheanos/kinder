package pl.pjatk.kinder.entity;

import javax.persistence.*;

@Entity
@Table(name = "address", schema = "public")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String address_name;
    private double latitude;
    private double longitude;

    @OneToOne(mappedBy = "address", cascade = CascadeType.ALL)
    private Event event;

    public Address(){}

    public Address(String address_name, double latitude, double longitude) {
        this.address_name = address_name;
        this.latitude = latitude;
        this.longitude = longitude;
    }


}
