package com.skipass.userservice.messaging;

import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQProducer {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private FanoutExchange deleteProfileExchange;

    // Routing key is not set, as the exchange is fanout
    public void sendDeleteUserProfileMessage(long userId) {
        System.out.println("In rabbitmq ");
        System.out.println(userId);

        rabbitTemplate.convertAndSend(
                deleteProfileExchange.getName(), "", userId);
    }
}
