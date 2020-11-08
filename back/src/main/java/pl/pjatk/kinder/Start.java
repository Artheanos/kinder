package pl.pjatk.kinder;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.pjatk.kinder.security.model.User;
import pl.pjatk.kinder.security.repo.UserRepository;

@Configuration
public class Start {
    public Start(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        User user = new User("admin", "admin", "admin", "admin@admin.pl", passwordEncoder.encode("admin"));
        userRepository.save(user);
    }
}
