package com.skipass.usermanagement.controllers;

import com.skipass.usermanagement.business.RabbitMQProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")

public class TestController {
    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    @GetMapping("/")
    public void test() {
        System.out.println("In Get controller");
        rabbitMQProducer.sendMessage("connected to RabbitMQ!");
    }
}
