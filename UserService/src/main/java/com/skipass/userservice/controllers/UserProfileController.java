package com.skipass.userservice.controllers;

import com.skipass.userservice.business.impl.ProfileServiceImpl;
import com.skipass.userservice.domain.requests.CreateUserProfileRequest;
import com.skipass.userservice.domain.requests.DeleteUserProfileRequest;
import com.skipass.userservice.domain.responses.CreateUserProfileResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class UserProfileController {

    private final ProfileServiceImpl profileService;

    @PostMapping(
            path = "/create-user")
    public ResponseEntity<Long> createUser(@RequestBody CreateUserProfileRequest request) {
        CreateUserProfileResponse response = profileService.createUserProfile(request);
        return ResponseEntity.ok().body(response.getId());
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Long> deleteProfile(@PathVariable(value = "userId") long userId) {
        System.out.print("In delete profile controller");
        DeleteUserProfileRequest request = DeleteUserProfileRequest.builder().userID(userId).build();
        profileService.deleteUserProfile(request);
        return ResponseEntity.ok().build();
    }
}
