package pl.pjatk.kinder.profile.edit;

public class PasswordRequest {

    private String password;
    private String newPassword;

    public PasswordRequest() {
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
