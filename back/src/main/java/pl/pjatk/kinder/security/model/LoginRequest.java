package pl.pjatk.kinder.security.model;

import javax.validation.constraints.Pattern;

public class LoginRequest {

    @Pattern(regexp = "^\\S+@\\S+$", message = "Invalid email format")
    String email;
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", message = "Invalid password format")
    String password;

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
