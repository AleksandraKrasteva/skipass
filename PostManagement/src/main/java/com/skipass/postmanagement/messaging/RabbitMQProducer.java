package com.skipass.postmanagement.messaging;

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

    public void sendDeleteStatisticsAndReactionsForPostMessage(String message) {
        rabbitTemplate.convertAndSend(
                deletePostExchange.getName(), "", message);
    }
}