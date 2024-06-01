package com.skipass.postmanagement.business.impl;

import com.skipass.postmanagement.domain.CreatePostRequest;
import com.skipass.postmanagement.domain.CreatePostResponse;
import com.skipass.postmanagement.persistance.PostEntity;
import com.skipass.postmanagement.persistance.PostRepository;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)

class PostServiceImplTest {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    PostServiceImpl postService;
    @Test
    @Tag("unit")
    void getPostsForUser() {
        PostEntity postOne = PostEntity.builder().userEmail("email@email.com").id(1l).text("").build();
        PostEntity postTwo = PostEntity.builder().userEmail("email@email.com").id(2l).text("").build();
        PostEntity postThree = PostEntity.builder().userEmail("email@email.com").id(3l).text("").build();

        when(postRepository.getPostEntitiesByUserEmailIs("email@email.com")).thenReturn(List.of(postOne, postTwo, postThree));

        List<PostEntity> actual = postService.getPostsForUser("email@email.com");

        assertEquals(3, actual.size());
        verify(postRepository, times(1)).getPostEntitiesByUserEmailIs("email@email.com");
    }
// Not implemented
//    @Test
//    @Tag("unit")
//    void getAllPosts() {
//
//    }

    @Test
    @Tag("unit")

    void deletePostById() {
        postService.deletePostById(1l);

        verify(postRepository, times(1)).deleteById(1l);
    }

    @Test
    @Tag("unit")

    void createPost() {
        CreatePostRequest request = CreatePostRequest.builder().userEmail("email@email.com").text("").build();
        PostEntity returned = PostEntity.builder().id(1l).build();
        PostEntity inserted = PostEntity.builder().userEmail("email@email.com").text("").build();
        CreatePostResponse expected = CreatePostResponse.builder().id(1).build();

        when(postRepository.save(inserted)).thenReturn(returned);

        CreatePostResponse actual = postService.createPost(request);

        assertEquals(expected, actual);
        verify(postRepository, times(1)).save(inserted);


    }

    @Test
    @Tag("unit")

    void deletePostsForUser() {

        postService.deletePostsForUser("email@email.com");

        verify(postRepository, times(1)).deletePostEntitiesByUserEmailIs("email@email.com");
    }
}