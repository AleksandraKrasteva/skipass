package com.skipass.journeyservice.messaging;

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
    public void sendDeletePostMessage(long journeyId) {
        System.out.println("In send delete post message");
        System.out.println(journeyId);
        rabbitTemplate.convertAndSend(
                deletePostExchange.getName(), "", journeyId);
    }
}