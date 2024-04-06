package com.skipass.postmanagement.messaging;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    static final String deletePostExchangeName = "delete-post";
    static final String statisticsQueueName = "delete-post-stats";

    @Bean
    public Queue statisticsQueue() {
        return new Queue(statisticsQueueName);
    }

    @Bean
    public FanoutExchange deletePostExchange() {
        return new FanoutExchange(deletePostExchangeName);
    }

    @Bean
    public Binding statisticsBinding() {
        return BindingBuilder.bind(statisticsQueue()).to(deletePostExchange());
    }
}
