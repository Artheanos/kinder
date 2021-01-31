package pl.pjatk.kinder.profile.account_edit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.pjatk.kinder.entity.Photo;
import pl.pjatk.kinder.entity.User;
import pl.pjatk.kinder.repo.UserRepository;
import pl.pjatk.kinder.security.jwt.JwtUtils;
import pl.pjatk.kinder.services.PhotoService;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("user")
public class UserEditController {

    private UserRepository userRepository;
    private PhotoService photoService;
    private PasswordEncoder passwordEncoder;
    private JwtUtils jwtUtils;
    private AuthenticationManager authenticationManager;

    @Autowired
    public UserEditController(UserRepository userRepository, PhotoService photoService, PasswordEncoder passwordEncoder,
                              JwtUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.photoService = photoService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    @PatchMapping("fullname/edit")
    public ResponseEntity<?> editFullname(@RequestBody FullNameEditRequest fullNameEditRequest, Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(principal.getName()).get();

        if (!passwordEncoder.matches(fullNameEditRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Wrong password", HttpStatus.FORBIDDEN);
        }

        user.setName(fullNameEditRequest.getName());
        user.setSurname(fullNameEditRequest.getSurname());
        userRepository.save(user);
        return ResponseEntity.ok("Modified");
    }

    @PatchMapping("email/edit")
    public ResponseEntity<?> editEmail(@RequestBody EmailEditRequest emailEditRequest, Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(principal.getName()).get();

        if (!passwordEncoder.matches(emailEditRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Wrong password", HttpStatus.FORBIDDEN);
        }

        if (userRepository.existsByEmail(emailEditRequest.getEmail())) {
            return new ResponseEntity<>("Email already exists!", HttpStatus.BAD_REQUEST);
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        user.setEmail(emailEditRequest.getEmail());
        userRepository.save(user);
        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(user, auth.getCredentials(), auth.getAuthorities());
//        Authentication a = authenticationManager.authenticate(newAuth);
        SecurityContextHolder.getContext().setAuthentication(newAuth);
        Map<String, String> response = new HashMap<>();
        response.put("status", "Modified");
        response.put("token", jwtUtils.generateToken(newAuth));
        return ResponseEntity.ok(response);
    }

    @PatchMapping("password/edit")
    public ResponseEntity<?> editPassword(@RequestBody PasswordRequest passwordRequest, Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(principal.getName()).get();

        if (!passwordEncoder.matches(passwordRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Wrong password", HttpStatus.FORBIDDEN);
        }

        user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("status", "Modified");
        response.put("token", jwtUtils.generateToken(SecurityContextHolder.getContext().getAuthentication()));
        return ResponseEntity.ok(response);
    }

    @PatchMapping(path = "data/edit", consumes = {"multipart/form-data"})
    public ResponseEntity<?> editData(@RequestPart(value = "file", required = false) MultipartFile file, @RequestPart("data") EditDataRequest editDataRequest, Principal principal) throws IOException, NoSuchAlgorithmException {

        if (principal == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(principal.getName()).get();
        if (file != null) {
            Photo photo = photoService.save(file);
            user.setPhoto(photo);
        }
        user.setCity(editDataRequest.getCity());
        user.setDescription(editDataRequest.getDescription());
        user.setUrlId(editDataRequest.getUrlId());

        userRepository.save(user);
        return ResponseEntity.ok("ok");
    }
}
