package com.skipass.postmanagement.controllers;

import com.skipass.postmanagement.business.ReactionService;
import com.skipass.postmanagement.domain.CreatePostRequest;
import com.skipass.postmanagement.domain.CreatePostResponse;
import com.skipass.postmanagement.domain.CreateReactionRequest;
import com.skipass.postmanagement.persistance.PostEntity;
import com.skipass.postmanagement.persistance.ReactionEntity;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ReactionController {
    private final ReactionService reactionService;
    @PostMapping("/create-reaction")
    public ResponseEntity createReaction(@RequestBody CreateReactionRequest request) {
        System.out.println(request);
        long response = reactionService.createReaction(request);
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("/get-reactions/{username}")
    public ResponseEntity getReactions(@PathVariable String username) {
        List<ReactionEntity> reactions = reactionService.getReactionsForUser(username);
        return ResponseEntity.ok().body(reactions);
    }
    @DeleteMapping("/delete-reaction/{id}")
    public ResponseEntity deleteReaction(@PathVariable(value = "id") long reactionId) {
        reactionService.deleteReaction(reactionId);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/delete-reactions/{username}")
    public ResponseEntity deleteReactions(@PathVariable(value = "username") String username) {
        reactionService.deleteAllReactionsFromUser(username);
        return ResponseEntity.ok().build();
    }
}