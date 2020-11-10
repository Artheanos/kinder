package pl.pjatk.kinder.security.jwt;

public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private String email;
    private String role;

    public JwtResponse(String accessToken, String email, String role) {
        this.token = accessToken;
        this.email = email;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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
