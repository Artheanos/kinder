package pl.pjatk.kinder.profile.edit;

public class EmailEditRequest {

    private String email;
    private String password;

    public EmailEditRequest() {
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
