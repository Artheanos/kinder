package pl.pjatk.kinder.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.pjatk.kinder.security.model.RegisterRequest;
import pl.pjatk.kinder.security.model.ResponseMessage;
import pl.pjatk.kinder.security.model.User;
import pl.pjatk.kinder.security.repo.UserRepository;

@RestController
@RequestMapping("/register")
@CrossOrigin("*")
public class RegisterController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public RegisterController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public ResponseEntity register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Email already in use!"));
        }

        User user = new User(registerRequest.getName(), registerRequest.getSurname(), registerRequest.getEmail(), passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(new ResponseMessage("User created"));
    }

}
