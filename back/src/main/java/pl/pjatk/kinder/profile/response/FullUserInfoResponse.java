package pl.pjatk.kinder.profile.response;

public class FullUserInfoResponse {

    private String name;
    private String surname;
    private String email;
    private String city;
    private String description;
    private String userId;
    private String photoUrl;

    public FullUserInfoResponse(String name, String surname, String email, String city, String description, String userId, String photoUrl) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.city = city;
        this.description = description;
        this.userId = userId;
        this.photoUrl = photoUrl;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}
