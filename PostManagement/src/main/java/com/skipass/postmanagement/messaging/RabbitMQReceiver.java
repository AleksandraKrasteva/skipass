package com.skipass.postmanagement.messaging;
import com.skipass.postmanagement.persistance.PostRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RabbitMQReceiver {
    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    private final PostRepository postRepository;

    @RabbitListener(queues = "delete-profile-posts")
    public void receiveMessage(long userId){
        System.out.println("Received message in Post service: " + userId);
        postRepository.deletePostEntitiesByUserIdIs(userId);

    }
}

