package com.skipass.userservice.business.impl;

import com.skipass.userservice.business.UserService;
import com.skipass.userservice.domain.UserType;
import com.skipass.userservice.persistance.UserEntity;
import com.skipass.userservice.persistance.UserRepository;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    @Tag("unit")
    void getAllUsers() {
        UserEntity userOne = UserEntity.builder().type(UserType.CLIENT).id(1).email("email@gmail.com").username("username").build();
        UserEntity userTwo = UserEntity.builder().type(UserType.CLIENT).id(2).email("email2@gmail.com").username("username2").build();
        UserEntity userTree = UserEntity.builder().type(UserType.CLIENT).id(3).email("email3@gmail.com").username("username3").build();

        when(userRepository.findAll()).thenReturn(List.of(userOne, userTwo, userTree));

        List<UserEntity>actual = userService.getAllUsers();

        assertEquals(3, actual.size());
        assertEquals(1, actual.get(0).getId());
        assertEquals(2, actual.get(1).getId());
        assertEquals(3, actual.get(2).getId());
        verify(userRepository, times(1)).findAll();
    }
}