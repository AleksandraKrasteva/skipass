package com.skipass.userservice.controllers;

import com.skipass.userservice.business.impl.UserServiceImpl;
import com.skipass.userservice.persistance.UserEntity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://krakend:808")
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/")
//@PropertySource("{value.from.file}")
//@PropertySource("classpath:/com/${my.placeholder:default/path}/app.properties")

public class UserController {

//    @Value("${value.from.file}")
//    private static String valueFromFile;

//    private final String corsOrigins = valueFromFile;

//    @Value("${email.smtp.server}")
//    private String server;


    private final UserServiceImpl userService;


    @GetMapping("/get-users")
//    @CrossOrigin(origins = {corsOrigins})
    public ResponseEntity<List<UserEntity>> getUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }
}

