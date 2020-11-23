package pl.pjatk.kinder.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.profile.response.BasicUserInfoResponse;
import pl.pjatk.kinder.profile.response.FullUserInfoResponse;
import pl.pjatk.kinder.repo.UserRepository;

import java.io.IOException;

@RestController
@RequestMapping("users/")
public class UserDetailsController {

    private UserRepository userRepository;

    @Autowired
    public UserDetailsController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("{userId}/full")
    public FullUserInfoResponse getFullInfo(@PathVariable String userId) {
        User user = getUserByUserId(userId);
        FullUserInfoResponse fullUserInfoResponse = new FullUserInfoResponse(user.getName(), user.getSurname(), user.getEmail(), user.getCity(), user.getDescription(), user.getUserId(), user.getPhoto().getUrl());
        return fullUserInfoResponse;
    }

    @GetMapping("{userId}/basic")
    public BasicUserInfoResponse getBasicInfo(@PathVariable String userId) throws IOException {
        User user = getUserByUserId(userId);
        BasicUserInfoResponse basicUserInfo = new BasicUserInfoResponse(user.getName(), user.getSurname(), user.getUserId(), user.getPhoto().getUrl());
        return basicUserInfo;
    }

    private User getUserByUserId(String userId) {
        return userRepository.findByUserId(userId).orElseThrow(() -> new UsernameNotFoundException(userId + " not found"));
    }
}
