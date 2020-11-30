package pl.pjatk.kinder.profile;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pl.pjatk.kinder.entity.Friend;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.profile.request.AddFriendRequest;
import pl.pjatk.kinder.profile.response.FriendListResponse;
import pl.pjatk.kinder.repo.FriendRepository;
import pl.pjatk.kinder.repo.UserRepository;

import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("friends")
public class FriendController {

    private UserRepository userRepository;
    private FriendRepository friendRepository;

    public FriendController(UserRepository userRepository, FriendRepository friendRepository) {
        this.userRepository = userRepository;
        this.friendRepository = friendRepository;
    }

    @GetMapping("{userId}")
    public ResponseEntity<FriendListResponse> getFriends(@PathVariable String userId) {
        User user = userRepository.findByUrlId(userId).get();
        FriendListResponse response = new FriendListResponse(user.getFriends().stream().map(Friend::getFriendId).map(User::getEmail).collect(Collectors.toList()));
        return ResponseEntity.ok(response);
    }

    @PostMapping("{userId}")
    public ResponseEntity addFriend(@PathVariable String userId, @RequestBody AddFriendRequest addFriendRequest) {
        User user = userRepository.findByUrlId(userId).get();
        User friend = userRepository.findByUrlId(addFriendRequest.getUrlId()).get();
        Friend userFriendRelation = new Friend(user, friend, false);
        Friend friendUserRelation = new Friend(friend, user, false);

        user.addFriend(userFriendRelation);
        friend.addFriend(friendUserRelation);

        userRepository.save(user);
        userRepository.save(friend);

        return ResponseEntity.ok("ok");
    }
}
