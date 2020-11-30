package pl.pjatk.kinder.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import pl.pjatk.kinder.entity.Photo;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.profile.response.BasicUserInfoResponse;
import pl.pjatk.kinder.profile.response.FullUserInfoResponse;
import pl.pjatk.kinder.repo.UserRepository;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("users/")
public class UserDetailsController {

    private UserRepository userRepository;

    @Autowired
    public UserDetailsController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("{urlId}/full")
    public FullUserInfoResponse getFullInfo(@PathVariable String urlId) {
        User user = getUserByUserId(urlId);
        Photo userPhoto = user.getPhoto();
        FullUserInfoResponse fullUserInfoResponse = new FullUserInfoResponse(user.getName(), user.getSurname(), user.getEmail(), user.getCity(), user.getDescription(), user.getUrlId(), userPhoto != null ? userPhoto.getUrl() : null);
        return fullUserInfoResponse;
    }

    @GetMapping("{urlId}/basic")
    public BasicUserInfoResponse getBasicInfo(@PathVariable String urlId) throws IOException {
        User user = getUserByUserId(urlId);
        Photo userPhoto = user.getPhoto();
        BasicUserInfoResponse basicUserInfo = new BasicUserInfoResponse(user.getName(), user.getSurname(), user.getUrlId(), userPhoto != null ? userPhoto.getUrl() : null);
        return basicUserInfo;
    }

    private User getUserByUserId(String userId) {
        return userRepository.findByUrlId(userId).orElseThrow(() -> new UsernameNotFoundException(userId + " not found"));
    }
}
