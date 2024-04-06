package com.skipass.postmanagement.messaging;

import com.skipass.postmanagement.business.PostService;
import com.skipass.postmanagement.persistance.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;


@AllArgsConstructor
@Component
public class RabbitMQReceiver {

    private final PostService postService;
    @RabbitListener(queues = "delete-profile-posts")
    public void receiveMessage(long userId) {
        System.out.println("Received delete posts for user: " + userId);
        postService.deletePostsForUser(userId);
    }
}

