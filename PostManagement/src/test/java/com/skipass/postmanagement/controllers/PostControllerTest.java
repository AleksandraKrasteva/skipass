package com.skipass.postmanagement.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skipass.postmanagement.business.impl.PostServiceImpl;
import com.skipass.postmanagement.domain.CreatePostRequest;
import com.skipass.postmanagement.domain.CreatePostResponse;
import com.skipass.postmanagement.persistance.PostEntity;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PostController.class)

class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostServiceImpl service;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Tag("unit")
    void createPost() throws Exception {
        CreatePostRequest request = CreatePostRequest.builder().text("").userId(1l).build();
        CreatePostResponse response = CreatePostResponse.builder().id(1).build();

        when(service.createPost(request)).thenReturn(response);

        this.mockMvc.perform(post("/create-post")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("1"));
    }

    @Test
    @Tag("unit")
    void viewPostsForUser() throws Exception {
        PostEntity postOne = PostEntity.builder().userId(1l).id(1l).text("").build();
        PostEntity postTwo = PostEntity.builder().userId(1l).id(2l).text("").build();
        PostEntity postThree = PostEntity.builder().userId(1l).id(3l).text("").build();

        when(service.getPostsForUser(1l)).thenReturn(List.of(postOne,postTwo, postThree));

        this.mockMvc.perform(get("/view/1")).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1,\"text\":\"\",\"userId\":1},{\"id\":2,\"text\":\"\",\"userId\":1},{\"id\":3,\"text\":\"\",\"userId\":1}]"));
    }

    @Test
    @Tag("unit")
    void deletePost() throws Exception {
        this.mockMvc.perform(delete("/delete/1")).andExpect(status().isOk());
        verify(service, times(1)).deletePostById(1);
    }
}