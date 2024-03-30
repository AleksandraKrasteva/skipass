package com.skipass.postmanagement.messaging;

import com.skipass.postmanagement.business.PostService;
import com.skipass.postmanagement.persistance.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RabbitMQReceiver {

    private RabbitMQProducer rabbitMQProducer;

    private final PostService postService;
    @RabbitListener(queues = "delete-profile-posts")
    public void receiveMessage(long userId) {
        System.out.println("Received delete posts for user: " + userId);
        postService.deletePostsForUser(userId);
    }
}

