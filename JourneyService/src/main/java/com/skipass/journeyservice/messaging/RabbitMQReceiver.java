package com.skipass.journeyservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQReceiver {
    @RabbitListener(queues = "delete-profile-journey")
    public void receiveMessage(String message) {
        System.out.println("Received journeys for user:: " + message);
    }
}
