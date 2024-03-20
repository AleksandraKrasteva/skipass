package com.skipass.usermanagement.controllers;

import com.skipass.usermanagement.messaging.RabbitMQProducer;
import com.skipass.usermanagement.persistance.UserEntity;
import com.skipass.usermanagement.persistance.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
//        rabbitMQProducer.sendDeleteProfileForUserMessage("please delete my profile - im a user :)");
        return "success on reaching the controller";
    }

    @PostMapping("/createuser")
    public ResponseEntity<Long> createUser(@RequestBody String username){
        UserEntity newUser = UserEntity.builder().email(username.concat("email.com")).username(username).build();
        var response = userRepository.save(newUser);
        System.out.println(response);
        return ResponseEntity.ok().body(response.getId());
    }

    @GetMapping("/getusers")
    public ResponseEntity<List<UserEntity>> getUsers(){
        List<UserEntity> users = userRepository.findAll();
        return ResponseEntity.ok().body(users);
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity deleteProfile(@PathVariable(value = "userId") long userId) {
        rabbitMQProducer.sendDeleteProfileForUserMessage(userId);
        userRepository.deleteById(userId);
        return ResponseEntity.ok().build();
    }

}
