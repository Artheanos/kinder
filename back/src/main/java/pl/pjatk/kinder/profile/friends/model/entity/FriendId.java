package pl.pjatk.kinder.profile.friends.model.entity;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class FriendId implements Serializable {

    private Long userId;
    private Long friendId;

    public FriendId() {
    }

    public FriendId(Long userId, Long friendId) {
        this.userId = userId;
        this.friendId = friendId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getFriendId() {
        return friendId;
    }

    public void setFriendId(Long friendId) {
        this.friendId = friendId;
    }
}
