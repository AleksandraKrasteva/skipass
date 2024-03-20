package com.skipass.usermanagement.messaging;

import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQProducer {
    private RabbitTemplate rabbitTemplate;

    private FanoutExchange deleteProfileExchange;

    // Routing key is not set, as the exchange is fanout
    public void sendDeleteUserProfileMessage(long userId) {
        rabbitTemplate.convertAndSend(
                deleteProfileExchange.getName(), "", userId);
    }
}
