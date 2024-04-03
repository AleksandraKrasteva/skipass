package com.skipass.userservice.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skipass.userservice.business.impl.ProfileServiceImpl;
import com.skipass.userservice.business.impl.UserServiceImpl;
import com.skipass.userservice.domain.UserType;
import com.skipass.userservice.domain.requests.CreateUserProfileRequest;
import com.skipass.userservice.domain.requests.DeleteUserProfileRequest;
import com.skipass.userservice.domain.responses.CreateUserProfileResponse;
import com.skipass.userservice.persistance.UserEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@WebMvcTest(UserProfileController.class)

class UserProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileServiceImpl service;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createUser() throws Exception {
        CreateUserProfileResponse response = CreateUserProfileResponse.builder().id(1).build();
        CreateUserProfileRequest request = CreateUserProfileRequest.builder().email("email").username("username").build();

        when(service.createUserProfile(request)).thenReturn(response);

        this.mockMvc.perform(post("/create-user")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("1"));
    }

    @Test
    void deleteProfile() throws Exception {
        DeleteUserProfileRequest request = DeleteUserProfileRequest.builder().userID(1).build();

        this.mockMvc.perform(delete("/delete/1")).andExpect(status().isOk());
    }
}