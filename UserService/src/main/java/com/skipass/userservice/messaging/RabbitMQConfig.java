package com.skipass.userservice.messaging;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    static final String fanoutExchangeName = "delete-profile";
    static final String statisticsQueueName = "delete-profile-statistics";
    static final String postsQueueName = "delete-profile-posts";
    static final String journeyQueueName = "delete-profile-journey";

    @Bean
    public FanoutExchange deleteProfileExchange() {
        return new FanoutExchange(fanoutExchangeName, true, false);
    }

    @Bean
    public Queue statisticsQueue() {
        return new Queue(statisticsQueueName);
    }

    @Bean
    public Queue postsQueue() {
        return new Queue(postsQueueName, true);
    }

    @Bean
    public Queue journeyQueue() {
        return new Queue(journeyQueueName);
    }

    @Bean
    public Binding statisticsBinding() {
        return BindingBuilder.bind(statisticsQueue()).to(deleteProfileExchange());
    }

    @Bean
    public Binding postsBinding() {
        return BindingBuilder.bind(postsQueue()).to(deleteProfileExchange());
    }

    @Bean
    public Binding journeyBinding() {
        return BindingBuilder.bind(journeyQueue()).to(deleteProfileExchange());
    }

}

