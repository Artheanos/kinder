package pl.pjatk.kinder.profile.response;

public class BasicUserInfoResponse {

    private String name;
    private String surname;
    private String userId;
    private String photoUrl;

    public BasicUserInfoResponse(String name, String surname, String userId, String photo) {
        this.name = name;
        this.surname = surname;
        this.userId = userId;
        this.photoUrl = photo;
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
