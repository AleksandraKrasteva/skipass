package com.skipass.statisticsservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQReceiver {
    @RabbitListener(queues = "delete-profile-statistics")
    public void receiveDeleteStatisticsForUser(String message)
    {
        System.out.println("Received message in Statistics service: " + message);
    }

    @RabbitListener(queues = "delete-post-stats")
    public void receiveDeleteStatsForPost(String message)
    {
        System.out.println("Received message in Statistics service: " + message);
    }
}
