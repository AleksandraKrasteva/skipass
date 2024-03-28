package com.skipass.userservice.business.impl;

import com.skipass.userservice.business.ProfileService;
import com.skipass.userservice.domain.UserType;
import com.skipass.userservice.domain.requests.CreateUserProfileRequest;
import com.skipass.userservice.domain.requests.DeleteUserProfileRequest;
import com.skipass.userservice.domain.responses.CreateUserProfileResponse;
import com.skipass.userservice.messaging.RabbitMQProducer;
import com.skipass.userservice.persistance.UserEntity;
import com.skipass.userservice.persistance.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final RabbitMQProducer rabbitMQProducer;


    @Override
    public CreateUserProfileResponse createUserProfile(CreateUserProfileRequest request) {
        UserEntity newUser = UserEntity.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .type(UserType.CLIENT).build();
        var dbResponse = userRepository.save(newUser);
        return CreateUserProfileResponse.builder().id(dbResponse.getId()).build();
    }

    @Override
    public void deleteUserProfile(DeleteUserProfileRequest request) {
        rabbitMQProducer.sendDeleteUserProfileMessage(request.getUserID());
        userRepository.deleteById(request.getUserID());
        //wait for rabbitMq response and then return profile id
    }
}
