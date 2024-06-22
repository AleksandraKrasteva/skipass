package com.skipass.postmanagement.business.impl;

import com.skipass.postmanagement.domain.*;
import com.skipass.postmanagement.persistance.PostEntity;
import com.skipass.postmanagement.persistance.PostRepository;
import com.skipass.postmanagement.persistance.ReactionRepository;
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
    @Mock
    private ReactionRepository reactionRepository;
    @InjectMocks
    PostServiceImpl postService;
    @Test
    @Tag("unit")
    void getPostsForUser() {
        PostEntity postOne = PostEntity.builder().username("user").id(1l).text("").build();
        PostEntity postTwo = PostEntity.builder().username("user").id(2l).text("").build();
        PostEntity postThree = PostEntity.builder().username("user").id(3l).text("").build();

        when(postRepository.getPostEntitiesByUsernameIs("user")).thenReturn(List.of(postOne, postTwo, postThree));

        List<Post> actual = postService.getPostsForUser("user");

        assertEquals(3, actual.size());
        verify(postRepository, times(1)).getPostEntitiesByUsernameIs("user");
    }
    @Test
    @Tag("unit")

    void createPost() {
        CreatePostRequest request = CreatePostRequest.builder().username("user").text("").build();
        PostEntity returned = PostEntity.builder().id(1l).build();
        PostEntity inserted = PostEntity.builder().username("user").text("").build();
        CreatePostResponse expected = CreatePostResponse.builder().id(1).build();

        when(postRepository.save(inserted)).thenReturn(returned);

        CreatePostResponse actual = postService.createPost(request);

        assertEquals(expected, actual);
        verify(postRepository, times(1)).save(inserted);
    }
    @Test
    @Tag("unit")
    void deletePostsForUser() {
        DeletePostsRequest request = DeletePostsRequest.builder().deleteJourney(false).username("user").build();

        postService.deletePostsForUser(request);

        verify(postRepository, times(1)).deletePostEntitiesByUsernameIs("user");
    }
}