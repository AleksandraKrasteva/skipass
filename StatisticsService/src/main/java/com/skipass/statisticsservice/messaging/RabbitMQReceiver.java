package com.skipass.statisticsservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQReceiver {
    @RabbitListener(queues = "delete-statistics")
    public void receiveMessage(String message)
    {
        System.out.println("Received message in Statistics service: " + message);
    }
}
