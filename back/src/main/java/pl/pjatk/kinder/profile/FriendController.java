package pl.pjatk.kinder.profile;

import liquibase.pro.packaged.F;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pl.pjatk.kinder.entity.Friend;
import pl.pjatk.kinder.entity.Photo;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.profile.request.AddFriendRequest;
import pl.pjatk.kinder.profile.response.BasicUserInfoResponse;
import pl.pjatk.kinder.profile.response.FriendListResponse;
import pl.pjatk.kinder.repo.FriendRepository;
import pl.pjatk.kinder.repo.UserRepository;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

//TODO: REFACTOR ALL CONTROLLERS!!!
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

    @GetMapping("{urlId}")
    public ResponseEntity<FriendListResponse> getFriends(@PathVariable String urlId) {
        User user = userRepository.findByUrlId(urlId).get();
        List<User> friends = user.getFriends().stream().filter(Friend::isAccepted).map(Friend::getFriendId).collect(Collectors.toList());
        FriendListResponse response = new FriendListResponse();
        for (User actualUser : friends) {
            if(actualUser.getFriends().get(actualUser.getFriends().indexOf(user)).isAccepted()) {
                Photo photo = user.getPhoto();
                response.addFriendEntity(new BasicUserInfoResponse(actualUser.getName(), actualUser.getSurname(), actualUser.getUrlId(), photo == null ? null : photo.getUrl()));
            }
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("{urlId}/requests")
    public ResponseEntity<FriendListResponse> getFriendRequests(@PathVariable String urlId) {
        User user = userRepository.findByUrlId(urlId).get();
        List<User> friends = user.getFriends().stream().filter(e -> !e.isAccepted()).map(Friend::getFriendId).collect(Collectors.toList());
        FriendListResponse response = new FriendListResponse();
        for (User actualUser : friends) {
            Photo photo = user.getPhoto();
            response.addFriendEntity(new BasicUserInfoResponse(actualUser.getName(), actualUser.getSurname(), actualUser.getUrlId(), photo == null ? null : photo.getUrl()));
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("{urlId}/add")
    public ResponseEntity sendFriendRequest(@PathVariable String urlId, Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(principal.getName()).get();
        User friendToAdd = userRepository.findByUrlId(urlId).get();
        Friend userFriendRelation = new Friend(user, friendToAdd, true);
        Friend friendUserRelation = new Friend(friendToAdd, user, false);

        user.addFriend(userFriendRelation);
        friendToAdd.addFriend(friendUserRelation);

        userRepository.save(user);
        userRepository.save(friendToAdd);

        return ResponseEntity.ok("ok");
    }

    @PostMapping("{urlId}/confirm")
    public ResponseEntity confirmFriendRequest(@PathVariable String urlId, Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(principal.getName()).get();
        User friendToAdd = userRepository.findByUrlId(urlId).get();
        Friend userFriendRelation = user.getFriends().stream().filter(e -> e.getFriendId().getId() == friendToAdd.getId()).findFirst().get();
        Friend friendUserRelation = friendToAdd.getFriends().stream().filter(e -> e.getFriendId().getId() == user.getId()).findFirst().get();

        userFriendRelation.setAccepted(true);
        friendUserRelation.setAccepted(true);

        userRepository.save(user);
        userRepository.save(friendToAdd);

        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("{urlId}")
    public ResponseEntity deleteFriend(@PathVariable String urlId, Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(principal.getName()).get();
        User friendToAdd = userRepository.findByUrlId(urlId).get();
        Friend userFriendRelation = user.getFriends().stream().filter(e -> e.getFriendId().getId() == friendToAdd.getId()).findFirst().get();
        Friend friendUserRelation = friendToAdd.getFriends().stream().filter(e -> e.getFriendId().getId() == user.getId()).findFirst().get();

        user.getFriends().remove(userFriendRelation);
        friendToAdd.getFriends().remove(friendUserRelation);

        userRepository.save(user);
        userRepository.save(friendToAdd);

        return ResponseEntity.ok("ok");
    }
}
