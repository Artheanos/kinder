package pl.pjatk.kinder.profile.edit;

public class FullNameEditRequest {

    private String name;
    private String surname;

    public FullNameEditRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
