package com.skipass.postmanagement.business;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQReceiver {
        @RabbitListener(queues = "queue-name")
    public void receiveMessage(String message)
    {
        // Handle the received message here
        System.out.println("Received message: " + message);
    }
}

