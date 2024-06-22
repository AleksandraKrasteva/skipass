package com.skipass.postmanagement.business;

import com.skipass.postmanagement.domain.*;
import com.skipass.postmanagement.persistance.PostEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {
    List<Post> getPostsForUser(String userEmail);

    List<Post> getAllPosts();
    void deletePostById(DeletePostRequest request);
    CreatePostResponse createPost(CreatePostRequest request);

    void deletePostsForUser(DeletePostsRequest userEmail);

    Long updatePostById(UpdatePostRequest request);

    void deletePostForJourney(long journeyId);
}
