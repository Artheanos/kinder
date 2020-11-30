package pl.pjatk.kinder.profile.request;

public class AddFriendRequest {

    private String urlId;

    public AddFriendRequest() {
    }

    public AddFriendRequest(String urlId) {
        this.urlId = urlId;
    }

    public String getUrlId() {
        return urlId;
    }

    public void setUrlId(String urlId) {
        this.urlId = urlId;
    }
}
