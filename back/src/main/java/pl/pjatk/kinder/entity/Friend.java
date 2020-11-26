package pl.pjatk.kinder.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_friend")
public class Friend {

    @EmbeddedId
    private FriendId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne
    @MapsId("friendId")
    @JoinColumn(name = "friend_id")
    private User friendId;

    private boolean accepted;

    public Friend() {
    }

    public Friend(User user, User friend, boolean accepted) {
        this.userId = user;
        this.friendId = friend;
        this.accepted = accepted;
    }

    public FriendId getId() {
        return id;
    }

    public void setId(FriendId id) {
        this.id = id;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public User getFriendId() {
        return friendId;
    }

    public void setFriendId(User friendId) {
        this.friendId = friendId;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}
