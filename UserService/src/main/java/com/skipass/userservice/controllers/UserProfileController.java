package com.skipass.userservice.controllers;

import com.skipass.userservice.business.impl.ProfileServiceImpl;
import com.skipass.userservice.domain.requests.CreateUserProfileRequest;
import com.skipass.userservice.domain.requests.DeleteUserProfileRequest;
import com.skipass.userservice.domain.responses.CreateUserProfileResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin("http://krakend:8080")
@RequestMapping("/")
public class UserProfileController {

    private final ProfileServiceImpl profileService;
    @PostMapping(
            path = "/create-user")
    public ResponseEntity<Long> createUser(@RequestBody CreateUserProfileRequest request) {
        CreateUserProfileResponse response = profileService.createUserProfile(request);
        return ResponseEntity.ok().body(response.getId());
    }

    @DeleteMapping("/delete-profile/{userId}")
    public ResponseEntity<Long> deleteProfile(@PathVariable(value = "userId") long userId) {
        System.out.println("In delete profile controller");
        DeleteUserProfileRequest request = DeleteUserProfileRequest.builder().userID(userId).build();
        profileService.deleteUserProfile(request);
        return ResponseEntity.ok().build();
    }
}
