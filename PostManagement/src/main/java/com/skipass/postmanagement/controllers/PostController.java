package com.skipass.postmanagement.controllers;

import com.skipass.postmanagement.business.PostService;
import com.skipass.postmanagement.domain.CreatePostRequest;
import com.skipass.postmanagement.domain.CreatePostResponse;
import com.skipass.postmanagement.persistance.PostEntity;
import com.skipass.postmanagement.persistance.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://krakend:8080")
@AllArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/create-post")
    public ResponseEntity createPost(@RequestBody CreatePostRequest request) {
        CreatePostResponse response = postService.createPost(request);
        return ResponseEntity.ok().body(response.getId());
    }

    @GetMapping("/view/{userId}")
    public ResponseEntity<List<PostEntity>> viewPostsForUser(@PathVariable(value = "userId") long userId) {
        List<PostEntity> posts = postService.getPostsForUser(userId);
        return ResponseEntity.ok().body(posts);
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity deletePost(@PathVariable(value = "postId") long postId) {
        postService.deletePostById(postId);
        return ResponseEntity.ok().build();
    }
}
