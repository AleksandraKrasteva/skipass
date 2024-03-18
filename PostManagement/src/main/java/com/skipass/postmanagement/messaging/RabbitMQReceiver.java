package com.skipass.postmanagement.messaging;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQReceiver {
    @Autowired
    private RabbitMQProducer rabbitMQProducer;

        @RabbitListener(queues = "delete-profile-posts")
    public void receiveMessage(String message)
    {
        //delete post
        System.out.println("Received message in Post service: " + message);
        //send message to delete likes for posts and statistics
//        rabbitMQProducer.sendDeleteStatisticsAndReactionsForPostMessage("Delete statistics and reactions for post (from post)");

    }
}

