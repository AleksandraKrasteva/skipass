package com.skipass.postmanagement.messaging;
import com.rabbitmq.client.impl.AMQImpl;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    static final String fanoutExchangeName = "delete-post";
//    static final String reactionsQueueName = "delete-post-reaction";
    static final String statisticsQueueName = "delete-post-stats";

//    @Bean public Queue reactionQueue()
//    {
//        return new Queue(reactionsQueueName);
//    }
    @Bean public Queue statisticsQueue()
    {
        return new Queue(statisticsQueueName);
    }

    @Bean public FanoutExchange deletePostExchange()
    {
        return new FanoutExchange(fanoutExchangeName);
    }

//    @Bean
//    public Binding postBinding(){return BindingBuilder.bind(reactionQueue()).to(deletePostExchange());}

    @Bean
    public Binding statisticsBinding()    {
        return BindingBuilder.bind(statisticsQueue()).to(deletePostExchange());
    }
}
