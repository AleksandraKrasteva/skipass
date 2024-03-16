package com.skipass.usermanagement.controllers;

import com.skipass.usermanagement.messaging.RabbitMQProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")

public class UserProfileController {
    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    @GetMapping("/")
    public void test() {
        rabbitMQProducer.sendDeleteProfileForUserMessage("please delete my profile - im a user :)");
    }
}
