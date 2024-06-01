package com.skipass.postmanagement.business.impl;

import com.skipass.postmanagement.business.PostService;
import com.skipass.postmanagement.domain.CreatePostRequest;
import com.skipass.postmanagement.domain.CreatePostResponse;
import com.skipass.postmanagement.domain.Post;
import com.skipass.postmanagement.persistance.PostEntity;
import com.skipass.postmanagement.persistance.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    @Override
    public List<PostEntity> getPostsForUser(String userEmail) {
        return postRepository.getPostEntitiesByUserEmailIs(userEmail);
    }
    @Override
    public List<PostEntity> getAllPosts() {
        return postRepository.findAll();
    }
    @Override
    public void deletePostById(long postId) {
        postRepository.deleteById(postId);
    }
    @Override
    public CreatePostResponse createPost(CreatePostRequest request) {
        PostEntity post = PostEntity.builder().text(request.getText()).userEmail(request.getUserEmail()).build();
            var response = postRepository.save(post);
            return CreatePostResponse.builder().id(response.getId()).build();
    }
    @Override
    public void deletePostsForUser(String userEmail) {
        postRepository.deletePostEntitiesByUserEmailIs(userEmail
        );
    }
}