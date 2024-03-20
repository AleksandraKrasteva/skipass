package com.skipass.usermanagement.controllers;

import com.skipass.usermanagement.messaging.RabbitMQProducer;
import com.skipass.usermanagement.repository.UserEntity;
import com.skipass.usermanagement.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@Service
public class UserProfileController {
    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    private final UserRepository userRepository;

    @GetMapping("/get")
    public String test() {
        rabbitMQProducer.sendDeleteProfileForUserMessage("please delete my profile - im a user :)");
        return "success on reaching the controller";
    }

    @PostMapping("/createuser")
    public ResponseEntity createUser(@RequestBody String username){
        System.out.println("IN");
        UserEntity newUser = UserEntity.builder().email(username.concat("email.com")).username(username).build();
        var response = userRepository.save(newUser);
        System.out.println(response);
        return ResponseEntity.ok().build();
    }

}
