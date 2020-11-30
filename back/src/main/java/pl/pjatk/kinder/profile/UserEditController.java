package pl.pjatk.kinder.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.pjatk.kinder.entity.Photo;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.profile.response.NameRequest;
import pl.pjatk.kinder.repo.PhotoRepository;
import pl.pjatk.kinder.repo.UserRepository;
import pl.pjatk.kinder.services.PhotoService;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("user")
public class UserEditController {

    private UserRepository userRepository;
    private PhotoService photoService;

    @Autowired
    public UserEditController(UserRepository userRepository, PhotoService photoService) {
        this.userRepository = userRepository;
        this.photoService = photoService;
    }

    @PutMapping("{id}/name")
    @PreAuthorize("#id == principal.id")
    public ResponseEntity editName(@PathVariable Long id, @RequestBody NameRequest nameRequest, Principal principal) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException(id + " not found"));
        user.setName(nameRequest.getName());
        userRepository.save(user);
        return ResponseEntity.ok("ok");
    }

    @PreAuthorize("#id == principal.id")
    @PutMapping("{id}/photo")
    public ResponseEntity uploadPhoto(@PathVariable Long id, @RequestParam MultipartFile file) throws IOException, NoSuchAlgorithmException {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException(id + " not found"));
        Photo photo = photoService.save(file);
        user.setPhoto(photo);
        userRepository.save(user);
        return ResponseEntity.ok("Photo uploaded");
    }

}
