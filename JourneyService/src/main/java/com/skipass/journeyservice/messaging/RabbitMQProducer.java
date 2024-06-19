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

    // Routing key is not set, as the exchange is fanout
    public void sendDeletePostMessage(long journeyId) {
        System.out.println("In rabbitmq ");
        System.out.println(journeyId);

        rabbitTemplate.convertAndSend(
                deletePostExchange.getName(), "", journeyId);
    }
}