package com.skipass.usermanagement.controllers;

import com.skipass.usermanagement.messaging.RabbitMQProducer;
import com.skipass.usermanagement.persistance.UserEntity;
import com.skipass.usermanagement.persistance.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://krakend:8080")
@AllArgsConstructor
public class UserProfileController {

    private final RabbitMQProducer rabbitMQProducer;
    private final UserRepository userRepository;

    @PostMapping("/create-user")
    public ResponseEntity<Long> createUser(@RequestBody String username) {
        UserEntity newUser = UserEntity.builder().email(username.concat("email.com")).username(username).build();
        var response = userRepository.save(newUser);
        return ResponseEntity.ok().body(response.getId());
    }

    @GetMapping("/get-users")
    public ResponseEntity<List<UserEntity>> getUsers() {
        List<UserEntity> users = userRepository.findAll();
        return ResponseEntity.ok().body(users);
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity deleteProfile(@PathVariable(value = "userId") long userId) {
        rabbitMQProducer.sendDeleteUserProfileMessage(userId);
        userRepository.deleteById(userId);
        return ResponseEntity.ok().build();
    }
}
