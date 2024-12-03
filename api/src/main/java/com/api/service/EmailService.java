package com.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendTaskNotification(String toEmail, String taskTitle, String taskDescription) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("You have been assigned a new task: " + taskTitle);
        message.setText("Task Details:\n\n" + taskDescription);
        message.setFrom("noreply@yourdomain.com");

        try {
            mailSender.send(message);
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
