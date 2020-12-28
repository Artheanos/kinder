package pl.pjatk.kinder.profile.friends.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.pjatk.kinder.profile.friends.model.FriendListResponse;
import pl.pjatk.kinder.profile.friends.service.FriendService;

import java.security.Principal;

//TODO: REFACTOR ALL CONTROLLERS!!!
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("friends")
public class FriendController {

    private final FriendService friendService;

    @Autowired
    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @PreAuthorize("#principal != null")
    @GetMapping
    public ResponseEntity<FriendListResponse> getFriends(Principal principal) {
        return friendService.getFriendList(principal.getName());
    }

    @PreAuthorize("#principal != null")
    @GetMapping("{query}/find")
    public ResponseEntity<FriendListResponse> findFriends(@PathVariable String query) {
        return friendService.findFriends(query);
    }

    @PreAuthorize("#principal != null")
    @GetMapping("requests")
    public ResponseEntity<?> getFriendRequests(Principal principal) {
        return friendService.getFriendRequests(principal.getName());
    }

    @PreAuthorize("#principal != null")
    @PostMapping("{urlId}/add")
    public ResponseEntity<?> sendFriendRequest(@PathVariable String urlId, Principal principal) {
        return friendService.sendFriendRequest(principal.getName(), urlId);
    }

    @PreAuthorize("#principal != null")
    @PostMapping("{urlId}/confirm")
    public ResponseEntity<?> confirmFriendRequest(@PathVariable String urlId, Principal principal) {
        return friendService.confirmFriendRequest(principal.getName(), urlId);
    }

    @PreAuthorize("#principal != null")
    @DeleteMapping("{urlId}/decline")
    public ResponseEntity<?> declineFriendRequest(@PathVariable String urlId, Principal principal) {
        return friendService.declineFriendRequest(principal.getName(), urlId);
    }

    @PreAuthorize("#principal != null")
    @DeleteMapping("{urlId}")
    public ResponseEntity<?> deleteFriend(@PathVariable String urlId, Principal principal) {
        return friendService.deleteFriend(principal.getName(), urlId);
    }
}
