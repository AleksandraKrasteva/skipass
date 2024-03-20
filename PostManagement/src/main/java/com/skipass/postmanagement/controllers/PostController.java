package com.skipass.postmanagement.controllers;

import com.skipass.postmanagement.domain.CreatePostRequest;
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

    private final PostRepository postRepository;

    @PostMapping("/create-post")
    public ResponseEntity createPost(@RequestBody CreatePostRequest request) {
        PostEntity post = PostEntity.builder().text(request.getText()).userId(request.getUserId()).build();
        postRepository.save(post);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/view/{userId}")
    public ResponseEntity<List<PostEntity>> viewPostsForUser(@PathVariable(value = "userId") long userId) {
        List<PostEntity> posts = postRepository.getPostEntitiesByUserIdIs(userId);
        return ResponseEntity.ok().body(posts);
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity deletePost(@PathVariable(value = "postId") long postId) {
        postRepository.deleteById(postId);
        return ResponseEntity.ok().build();
    }
}
