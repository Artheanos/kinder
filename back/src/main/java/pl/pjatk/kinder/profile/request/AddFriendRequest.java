package pl.pjatk.kinder.profile.request;

public class AddFriendRequest {

    private String userId;

    public AddFriendRequest() {
    }

    public AddFriendRequest(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
