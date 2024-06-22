package com.skipass.journeyservice.messaging;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    static final String fanoutExchangeName = "delete-post";
    static final String postsQueueName = "delete-post-for-journey";
    @Bean
    public FanoutExchange deletePostExchange() {
        return new FanoutExchange(fanoutExchangeName, true, false);
    }
    @Bean
    public Queue postQueue() {
        return new Queue(postsQueueName, true);
    }
    @Bean
    public Binding postsBinding() {
        return BindingBuilder.bind(postQueue()).to(deletePostExchange());
    }
}