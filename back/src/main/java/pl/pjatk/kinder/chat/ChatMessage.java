package pl.pjatk.kinder.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import pl.pjatk.kinder.entity.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_message")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String chatId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private User recipient;

    private String content;

    @Column(name="date_send")
    private LocalDateTime timeSend;

    public ChatMessage() {
    }

    public ChatMessage(String chatId, User sender, User recipient, String content, LocalDateTime timeSend) {
        this.chatId = chatId;
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.timeSend = timeSend;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getTimeSend() {
        return timeSend;
    }

    public void setTimeSend(LocalDateTime timeSend) {
        this.timeSend = timeSend;
    }

    public void setContent(String content) {
        this.content = content;
    }
}