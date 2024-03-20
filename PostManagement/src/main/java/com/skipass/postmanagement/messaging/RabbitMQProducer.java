package com.skipass.postmanagement.messaging;

import lombok.AllArgsConstructor;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RabbitMQProducer {
    private RabbitTemplate rabbitTemplate;

    private FanoutExchange deletePostExchange;

    public void sendDeleteStatisticsAndReactionsForPostMessage(String message) {
        rabbitTemplate.convertAndSend(
                deletePostExchange.getName(), "", message);
    }
}