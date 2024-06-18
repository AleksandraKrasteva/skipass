package com.skipass.postmanagement.business;

import com.skipass.postmanagement.domain.CreatePostRequest;
import com.skipass.postmanagement.domain.CreatePostResponse;
import com.skipass.postmanagement.domain.Post;
import com.skipass.postmanagement.domain.UpdatePostRequest;
import com.skipass.postmanagement.persistance.PostEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {
    List<Post> getPostsForUser(String userEmail);

    List<Post> getAllPosts();
    void deletePostById(long postId);
    CreatePostResponse createPost(CreatePostRequest request);

    void deletePostsForUser(String userEmail);

    Long updatePostById(UpdatePostRequest request);
}
