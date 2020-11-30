package pl.pjatk.kinder.chat;

public class Message {

    private String message;
    private String senderId;
    private String recipientId;

    public Message() {
    }

    public Message(String message, String senderId, String recipientId) {
        this.message = message;
        this.senderId = senderId;
        this.recipientId = recipientId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }
}
