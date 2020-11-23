package pl.pjatk.kinder.profile.response;

public class NameRequest {

    private String name;

    public NameRequest() {
    }

    public NameRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
