package pl.pjatk.kinder.security.model;

import javax.validation.constraints.Pattern;

public class RegisterRequest {

    @Pattern(regexp = "^\\S+@\\S+$", message = "Invalid email format")
    private String email;
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$", message = "Invalid password format")
    private String password;
    @Pattern(regexp = "^(?=.*[\\S]).{0,100}$", message = "Invalid name format")
    private String name;
    @Pattern(regexp = "^(?=.*[\\S]).{0,100}$", message = "Invalid surname format")
    private String surname;

    public RegisterRequest(String email, String password, String name, String surname) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}