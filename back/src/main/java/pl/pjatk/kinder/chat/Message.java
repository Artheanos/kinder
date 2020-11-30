package pl.pjatk.kinder.chat;

public class Message {

    private String message;
    private String recipientUserId;

    public Message() {
    }

    public Message(String message, String recipientUserId) {
        this.message = message;
        this.recipientUserId = recipientUserId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRecipientUserId() {
        return recipientUserId;
    }

    public void setRecipientUserId(String recipientUserId) {
        this.recipientUserId = recipientUserId;
    }
}
