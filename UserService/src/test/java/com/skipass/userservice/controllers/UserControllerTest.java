package com.skipass.userservice.controllers;


import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.skipass.userservice.business.UserService;
import com.skipass.userservice.business.impl.UserServiceImpl;
import com.skipass.userservice.domain.UserType;
import com.skipass.userservice.persistance.UserEntity;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;


@WebMvcTest(UserController.class)

class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserServiceImpl service;

    @Test
    void getUsers() throws Exception {
        UserEntity userOne = UserEntity.builder().type(UserType.CLIENT).id(1).email("email@gmail.com").username("username").build();
        UserEntity userTwo = UserEntity.builder().type(UserType.CLIENT).id(2).email("email2@gmail.com").username("username2").build();

        when(service.getAllUsers()).thenReturn(List.of(userOne, userTwo));

        this.mockMvc.perform(get("/get-users")).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1,\"username\":\"username\",\"email\":\"email@gmail.com\",\"type\":\"CLIENT\"},{\"id\":2,\"username\":\"username2\",\"email\":\"email2@gmail.com\",\"type\":\"CLIENT\"}]"));
    }
}