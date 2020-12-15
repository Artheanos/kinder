package pl.pjatk.kinder.category;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
public class CategoryRequest {

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

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
