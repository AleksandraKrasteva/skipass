package com.skipass.postmanagement.messaging;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQReceiver {
        @RabbitListener(queues = "delete-posts")
    public void receiveMessage(String message)
    {
        System.out.println("Received message in Post service: " + message);
    }
}

