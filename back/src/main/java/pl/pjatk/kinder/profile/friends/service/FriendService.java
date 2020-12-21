package pl.pjatk.kinder.profile.friends.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.pjatk.kinder.entity.Photo;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.profile.details.BasicUserInfoResponse;
import pl.pjatk.kinder.profile.friends.model.entity.Friend;
import pl.pjatk.kinder.profile.friends.model.FriendListResponse;
import pl.pjatk.kinder.profile.friends.model.entity.FriendRequest;
import pl.pjatk.kinder.profile.friends.repo.FriendRepository;
import pl.pjatk.kinder.profile.friends.repo.FriendRequestRepository;
import pl.pjatk.kinder.repo.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendService {

    private UserRepository userRepository;
    private FriendRepository friendRepository;
    private FriendRequestRepository friendRequestRepository;

    @Autowired
    public FriendService(UserRepository userRepository, FriendRepository friendRepository, FriendRequestRepository friendRequestRepository) {
        this.userRepository = userRepository;
        this.friendRepository = friendRepository;
        this.friendRequestRepository = friendRequestRepository;
    }

    public ResponseEntity<FriendListResponse> getFriendList(String email) {
        User user = userRepository.findByEmail(email).get();
        List<User> friends = user.getFriends().stream().map(Friend::getFriendId).collect(Collectors.toList());
        FriendListResponse response = buildFriendListResponse(friends);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> getFriendRequests(String principal) {

        User user = userRepository.findByEmail(principal).get();
        List<FriendRequest> requests = friendRequestRepository.findAllByFriendId(user.getId());
        List<User> friends = requests.stream().map(FriendRequest::getUser).collect(Collectors.toList());
        FriendListResponse response = buildFriendListResponse(friends);
        return ResponseEntity.ok(response);
    }

    private FriendListResponse buildFriendListResponse(List<User> friends) {
        FriendListResponse response = new FriendListResponse();
        for (User actualUser : friends) {
            Photo photo = actualUser.getPhoto();
            response.addFriendEntity(new BasicUserInfoResponse(actualUser.getName(), actualUser.getSurname(), actualUser.getUrlId(), photo == null ? null : photo.getUrl()));
        }
        return response;
    }

    public ResponseEntity<?> sendFriendRequest(String userEmail, String friendUrlId) {
        User user = userRepository.findByEmail(userEmail).get();
        User friendToAdd = userRepository.findByUrlId(friendUrlId).get();

        if (user.getId() == friendToAdd.getId()) {
            return new ResponseEntity<>("You cannot add yourself", HttpStatus.BAD_REQUEST);
        }

        if (friendRepository.existsByUserIdIdAndFriendIdId(user.getId(), friendToAdd.getId())) {
            return new ResponseEntity<>("You are already friends", HttpStatus.BAD_REQUEST);
        }

        if (friendRequestRepository.existsByUserIdAndFriendId(user.getId(), friendToAdd.getId()) ||
                friendRequestRepository.existsByUserIdAndFriendId(friendToAdd.getId(), user.getId()) ) {
            return new ResponseEntity<>("User already invited", HttpStatus.BAD_REQUEST);
        }

        FriendRequest request = new FriendRequest(user, friendToAdd);
        friendRequestRepository.save(request);

        return ResponseEntity.ok("Friend request send");
    }

    public ResponseEntity<?> confirmFriendRequest(String userEmail, String friendUrlId) {
        User user = userRepository.findByEmail(userEmail).get();
        User friend = userRepository.findByUrlId(friendUrlId).get();

        if (!friendRequestRepository.existsByUserIdAndFriendId(friend.getId(), user.getId())) {
            return new ResponseEntity<>("Wrong confirm request", HttpStatus.BAD_REQUEST);
        }

        Friend userToFriendRelation = new Friend(user, friend, true);
        Friend friendToUserRelation = new Friend(friend, user, true);
        user.addFriend(userToFriendRelation);
        friend.addFriend(friendToUserRelation);
        userRepository.save(user);
        userRepository.save(friend);
        friendRequestRepository.deleteByUserIdAndFriendId(friend.getId(), user.getId());

        return ResponseEntity.ok("Invitation confirmed");
    }

    public ResponseEntity<?> declineFriendRequest(String userEmail, String friendUrlId) {

        User user = userRepository.findByEmail(userEmail).get();
        User friend = userRepository.findByUrlId(friendUrlId).get();
        friendRequestRepository.deleteByUserIdAndFriendId(friend.getId(), user.getId());

        return ResponseEntity.ok("Invitation declined");
    }

    public ResponseEntity<?> deleteFriend(String userEmail, String friendUrlId) {

        User user = userRepository.findByEmail(userEmail).get();
        User friend = userRepository.findByUrlId(friendUrlId).get();

        if (user.getId() == friend.getId()) {
            return new ResponseEntity<>("You cannot delete yourself", HttpStatus.BAD_REQUEST);
        }

        Optional<Friend> userFriendRelation = user.getFriends().stream().filter(e -> e.getFriendId().getId() == friend.getId()).findFirst();
        Optional<Friend> friendUserRelation = friend.getFriends().stream().filter(e -> e.getFriendId().getId() == user.getId()).findFirst();

        if (userFriendRelation.isEmpty() || friendUserRelation.isEmpty()) {
            return new ResponseEntity<>("You are not friends", HttpStatus.BAD_REQUEST);
        }

        user.getFriends().remove(userFriendRelation.get());
        friend.getFriends().remove(friendUserRelation.get());

        userRepository.save(user);
        userRepository.save(friend);

        return ResponseEntity.ok("Friend deleted");
    }

}
