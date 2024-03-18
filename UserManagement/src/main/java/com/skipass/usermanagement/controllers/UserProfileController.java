package com.skipass.usermanagement.controllers;

import com.skipass.usermanagement.messaging.RabbitMQProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@CrossOrigin(origins = "*")

public class UserProfileController {
    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    @GetMapping("/get")
    public String test() {
        rabbitMQProducer.sendDeleteProfileForUserMessage("please delete my profile - im a user :)");
        return "success";
    }

}
