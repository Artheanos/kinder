package pl.pjatk.kinder.security.jwt;

public class JwtResponse {

    private String token;
    private Long id;
    private String type = "Bearer";
    private String email;
    private String role;
    private String urlId;

    public JwtResponse(String accessToken, Long id, String email, String role, String urlId) {
        this.id = id;
        this.token = accessToken;
        this.email = email;
        this.role = role;
        this.urlId = urlId;
    }

    public String getUrlId() {
        return urlId;
    }

    public void setUrlId(String urlId) {
        this.urlId = urlId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
