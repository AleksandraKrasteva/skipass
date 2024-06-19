package com.skipass.postmanagement.messaging;

import com.skipass.postmanagement.business.PostService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;

@Configuration
public class RabbitMQConfig {

    static final String fanoutExchangeName = "delete-journey";
    static final String postsQueueName = "delete-journey-for-post";
    @Bean
    public FanoutExchange deleteJourneyExchange() {
        return new FanoutExchange(fanoutExchangeName, true, false);
    }
    @Bean
    public Queue journeyQueue() {
        return new Queue(postsQueueName, true);
    }

    @Bean
    public Binding postsBinding() {
        return BindingBuilder.bind(journeyQueue()).to(deleteJourneyExchange());
    }

}