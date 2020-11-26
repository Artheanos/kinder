package pl.pjatk.kinder.profile;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import pl.pjatk.kinder.entity.Friend;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.profile.request.AddFriendRequest;
import pl.pjatk.kinder.repo.FriendRepository;
import pl.pjatk.kinder.repo.UserRepository;

@RestController
@RequestMapping("friends")
public class FriendController {

    private UserRepository userRepository;
    private FriendRepository friendRepository;

    public FriendController(UserRepository userRepository, FriendRepository friendRepository) {
        this.userRepository = userRepository;
        this.friendRepository = friendRepository;
    }

    @PostMapping("{userId}")
    public ResponseEntity addFriend(@PathVariable String userId, @RequestBody AddFriendRequest addFriendRequest) {

        User user = userRepository.findByUserId(userId).get();
        User friend = userRepository.findByUserId(addFriendRequest.getUserId()).get();
        user.addFriend(friend);
        //Friend friend1 = new Friend(user, friend, false);
        //friendRepository.save(friend1);
        userRepository.save(user);
        return ResponseEntity.ok("ok");
    }
}
