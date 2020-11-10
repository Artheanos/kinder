package pl.pjatk.kinder.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.pjatk.kinder.security.repo.UserRepository;
import pl.pjatk.kinder.security.jwt.JwtResponse;
import pl.pjatk.kinder.security.jwt.JwtUtils;
import pl.pjatk.kinder.security.model.LoginRequest;
import pl.pjatk.kinder.security.model.User;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {

    private JwtUtils jwtUtils;
    private AuthenticationManager authenticationManager;

    @Autowired
    public LoginController(JwtUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping
    public ResponseEntity login(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtils.generateToken(authentication);
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(token, user.getEmail(), user.getRole().toString()));
    }
}
