package pl.pjatk.kinder.event;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;
import pl.pjatk.kinder.entity.Address;
import pl.pjatk.kinder.entity.Category;
import pl.pjatk.kinder.entity.Photo;


@Component
@RequestScope
public class EventRequest {


    private String title;
    private String description;
    private String startDate;
    private String endDate;
    private int capacity;

    private String address_name;
    private double latitude;
    private double longitude;

    private String category_title;

    private String photo_url;

    public EventRequest(){}

    public EventRequest(String title, String address_name, double latitude, double longitude, String category_title,
                        String photo_url, String description, String startDate, String endDate, int capacity) {
        this.title = title;
        this.address_name = address_name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.category_title = category_title;
        this.photo_url = photo_url;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.capacity = capacity;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public int getCapacity() {
        return capacity;
    }

    public String getAddress_name() {
        return address_name;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getCategory_title() {
        return category_title;
    }

    public String getPhoto_url() {
        return photo_url;
    }
}
