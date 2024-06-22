package com.skipass.journeyservice.messaging;

import com.skipass.journeyservice.business.JourneyService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RabbitMQReceiver {

    private final JourneyService journeyService;
    @RabbitListener(queues = "delete-journey-for-post")
    public void receiveMessage(int journeyId) {
        System.out.println("Received delete journey msg, journeyID: " + journeyId);
        journeyService.deleteJourneyById(journeyId);
    }
}
