package pl.pjatk.kinder.event;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;


@Component
@RequestScope
public class EventRequest {


    private String title;
    private String description;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private LocalDateTime startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private LocalDateTime endDate;
    private int capacity;

    private String address_name;
    private double latitude;
    private double longitude;

    private String category_title;


    public EventRequest(){}

    public EventRequest(String title, String address_name, double latitude, double longitude, String category_title,
                          String description, LocalDateTime startDate, LocalDateTime endDate, int capacity) {
        this.title = title;
        this.address_name = address_name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.category_title = category_title;
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

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
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
}
