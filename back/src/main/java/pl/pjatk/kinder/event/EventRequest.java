package pl.pjatk.kinder.event;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;
import pl.pjatk.kinder.entity.State;
import pl.pjatk.kinder.entity.Subcategory;

import java.sql.Timestamp;
import java.util.List;

@Component
@RequestScope
public class EventRequest {

    private String title;
    private String addres;
    private String description;
    private String startDate;
    private String endDate;
    private int capacity;


    public EventRequest(){}

    public EventRequest(String title, String addres, String description, String startDate, String endDate, int capacity) {
        this.title = title;
        this.addres = addres;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.capacity = capacity;
    }

    public String getTitle() {
        return title;
    }

    public String getAddres() {
        return addres;
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

}
