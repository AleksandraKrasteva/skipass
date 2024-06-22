package com.skipass.postmanagement.messaging;

import lombok.AllArgsConstructor;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQProducer {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private FanoutExchange deletePostExchange;
    public void sendDeleteJourneyMessage(long postId) {
        System.out.println("send delete journey message for postid ");
        System.out.println(postId);
        rabbitTemplate.convertAndSend(
                deletePostExchange.getName(), "", postId);
    }
}