package com.skipass.postmanagement.business;

import com.skipass.postmanagement.domain.CreatePostRequest;
import com.skipass.postmanagement.domain.CreatePostResponse;
import com.skipass.postmanagement.domain.Post;
import com.skipass.postmanagement.persistance.PostEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {

    List<PostEntity> getPostsForUser(long userId);

//    List<PostEntity> getAllPosts(); Currently not used
    void deletePostById(long postId);
    CreatePostResponse createPost(CreatePostRequest request);

    void deletePostsForUser(long userId);
}
