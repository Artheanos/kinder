package pl.pjatk.kinder.entity;

import javax.persistence.*;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String address_name;
    private double latitude;
    private double longitude;

    @OneToOne(mappedBy = "address", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch=FetchType.EAGER)
    private Event event;

    public Address(){}

    public Address(String address_name, double latitude, double longitude) {
        this.address_name = address_name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getAddress_name() {
        return address_name;
    }

    public void setAddress_name(String address_name) {
        this.address_name = address_name;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
