package com.skipass.usermanagement.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")

public class testController {
    @GetMapping("/")
    public String test() {
        return "Hi, im a test controller";
    }

}
