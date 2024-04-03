package com.skipass.userservice.business.impl;

import com.skipass.userservice.business.ProfileService;
import com.skipass.userservice.domain.UserType;
import com.skipass.userservice.domain.requests.CreateUserProfileRequest;
import com.skipass.userservice.domain.requests.DeleteUserProfileRequest;
import com.skipass.userservice.domain.responses.CreateUserProfileResponse;
import com.skipass.userservice.messaging.RabbitMQProducer;
import com.skipass.userservice.persistance.UserEntity;
import com.skipass.userservice.persistance.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class ProfileServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private ProfileServiceImpl profileService;
    @Mock
    private RabbitMQProducer rabbitMQProducer;

    @Test
    void createUserProfile() {
        CreateUserProfileRequest request = CreateUserProfileRequest.builder().email("email@gmail.com").username("username").build();
        UserEntity createdUser = UserEntity.builder().type(UserType.CLIENT).email("email@gmail.com").username("username").build();
        UserEntity returnedUser = UserEntity.builder().id(1).build();
        when(userRepository.save(createdUser)).thenReturn(returnedUser);

        CreateUserProfileResponse expected = CreateUserProfileResponse.builder().id(1).build();
        CreateUserProfileResponse actual = profileService.createUserProfile(request);

        assertEquals(expected, actual);
        verify(userRepository, times(1)).save(createdUser);
    }

    @Test
    void deleteUserProfile() {
        DeleteUserProfileRequest request = DeleteUserProfileRequest.builder().userID(1).build();

        profileService.deleteUserProfile(request);

        verify(userRepository, times(1)).deleteById(request.getUserID());
        verify(rabbitMQProducer, times(1)).sendDeleteUserProfileMessage(request.getUserID());
    }
}