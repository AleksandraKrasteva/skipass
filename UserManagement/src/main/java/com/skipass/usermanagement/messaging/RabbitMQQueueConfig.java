package com.skipass.usermanagement.messaging;
import com.rabbitmq.client.impl.AMQImpl;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration

public class RabbitMQQueueConfig {

    static final String fanoutExchangeName = "delete-profile";
    static final String statisticsQueueName = "delete-statistics";
    static final String postsQueueName = "delete-posts";
    static final String reactionsQueueName = "delete-reactions";
    static final String journeyQueueName = "delete-journey";

    @Bean public Queue statisticsQueue()
    {
        return new Queue(statisticsQueueName);
    }
    @Bean public Queue postsQueue()
    {
        return new Queue(postsQueueName);
    }
    @Bean public Queue reactionsQueue()
    {
        return new Queue(reactionsQueueName);
    }
    @Bean public Queue journeyQueue()
    {
        return new Queue(journeyQueueName);
    }

    @Bean public FanoutExchange exchange()
    {
        return new FanoutExchange(fanoutExchangeName);
    }

    @Bean
    public Binding statisticsBinding()
    {
        return BindingBuilder.bind(statisticsQueue()).to(exchange());
    }
    @Bean
    public Binding reactionsBinding()
    {
        return BindingBuilder.bind(reactionsQueue()).to(exchange());
    }
    @Bean
    public Binding postsBinding()
    {
        return BindingBuilder.bind(postsQueue()).to(exchange());
    }

    @Bean
    public Binding journeyBinding()
    {
        return BindingBuilder.bind(journeyQueue()).to(exchange());
    }
}

