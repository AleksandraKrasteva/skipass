package com.skipass.postmanagement.controllers;

import com.skipass.postmanagement.business.PostService;
import com.skipass.postmanagement.domain.CreatePostRequest;
import com.skipass.postmanagement.domain.CreatePostResponse;
import com.skipass.postmanagement.domain.Post;
import com.skipass.postmanagement.domain.UpdatePostRequest;
import com.skipass.postmanagement.persistance.PostEntity;
import com.skipass.postmanagement.persistance.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/create-post")
    public ResponseEntity createPost(@RequestBody CreatePostRequest request) {
        CreatePostResponse response = postService.createPost(request);
        return ResponseEntity.ok().body(response.getId());
    }

    @GetMapping("/view-posts-user/{username}")
    public ResponseEntity<List<Post>> viewPostsForUser(@PathVariable(value = "username") String username) {
        List<Post> posts = postService.getPostsForUser(username);
        return ResponseEntity.ok().body(posts);
    }

    @GetMapping("/view-posts")
    public ResponseEntity<List<Post>> viewAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok().body(posts);
    }

    @DeleteMapping("/delete-post/{postId}")
    public ResponseEntity deletePost(@PathVariable(value = "postId") long postId) {
        postService.deletePostById(postId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete-all-posts/{username}")
    public ResponseEntity deleteAllPostsForUser(@PathVariable(value = "username") String username) {
        postService.deletePostsForUser(username);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update-post")
    public ResponseEntity updatePost(@RequestBody UpdatePostRequest request) {
        postService.updatePostById(request);
        return ResponseEntity.ok().build();
    }
}
