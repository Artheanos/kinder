package pl.pjatk.kinder.security.jwt;

public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private String username;
    private String email;
    private String role;

    public JwtResponse(String accessToken, String username, String email, String role) {
        this.token = accessToken;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
