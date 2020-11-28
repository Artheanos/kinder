package pl.pjatk.kinder.profile.response;

import pl.pjatk.kinder.entity.User;

import java.util.List;

public class FriendListResponse {

    List<String> friends;

    public FriendListResponse() {
    }

    public FriendListResponse(List<String> friends) {
        this.friends = friends;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }
}
