package pl.pjatk.kinder.profile.friends.model.entity;

import pl.pjatk.kinder.entity.User;

import javax.persistence.*;

@Entity
@Table(name = "user_friend_request")
public class FriendRequest {

    @EmbeddedId
    private FriendRequestId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @MapsId("friendId")
    @JoinColumn(name = "friend_id")
    private User friend;

    public FriendRequest(User user, User friend) {
        this.id = new FriendRequestId(user.getId(), friend.getId());
        this.user = user;
        this.friend = friend;
    }

    public FriendRequest() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getFriend() {
        return friend;
    }

    public void setFriend(User friend) {
        this.friend = friend;
    }

}
