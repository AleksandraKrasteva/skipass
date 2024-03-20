package com.skipass.usermanagement.messaging;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQProducer {
    @Autowired private RabbitTemplate rabbitTemplate;

    @Autowired
    private FanoutExchange exchange;

    public void sendDeleteProfileForUserMessage(long userId)
    {
        rabbitTemplate.convertAndSend(
                exchange.getName(), "", userId);
    }
}
