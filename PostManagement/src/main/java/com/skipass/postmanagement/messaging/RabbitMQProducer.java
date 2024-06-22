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

    // Routing key is not set, as the exchange is fanout
    public void sendDeleteJourneyMessage(long postId) {
        System.out.println("In rabbitmq ");
        System.out.println(postId);

        rabbitTemplate.convertAndSend(
                deletePostExchange.getName(), "", postId);
    }
}