package pl.pjatk.kinder.profile.friends.model;

import pl.pjatk.kinder.profile.details.BasicUserInfoResponse;

import java.util.ArrayList;
import java.util.List;

public class FriendListResponse {

    List<BasicUserInfoResponse> friends;

    public FriendListResponse() {
        friends = new ArrayList<>();
    }

    public void addFriendEntity(BasicUserInfoResponse response) {
        friends.add(response);
    }

    public List<BasicUserInfoResponse> getFriends() {
        return friends;
    }

    public void setFriends(List<BasicUserInfoResponse> friends) {
        this.friends = friends;
    }
}
