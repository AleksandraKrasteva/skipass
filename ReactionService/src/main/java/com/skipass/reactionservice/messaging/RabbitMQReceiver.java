package com.skipass.reactionservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQReceiver {
    @RabbitListener(queues = "delete-reactions")
    public void receiveMessage(String message)
    {
        System.out.println("Received message in Reactions service: " + message);
    }
}
