package com.skipass.userservice.business;

import com.skipass.userservice.domain.requests.CreateUserProfileRequest;
import com.skipass.userservice.domain.requests.DeleteUserProfileRequest;
import com.skipass.userservice.domain.responses.CreateUserProfileResponse;
import org.springframework.stereotype.Service;

@Service
public interface ProfileService {
    CreateUserProfileResponse createUserProfile(CreateUserProfileRequest request);

    void deleteUserProfile(DeleteUserProfileRequest request);
}
