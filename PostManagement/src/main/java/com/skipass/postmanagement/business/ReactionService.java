package com.skipass.postmanagement.business;

import com.skipass.postmanagement.domain.CreateReactionRequest;
import com.skipass.postmanagement.domain.Reaction;
import com.skipass.postmanagement.persistance.ReactionEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReactionService {
    void deleteReaction(long reactionId);
    long createReaction(CreateReactionRequest request);

    void deleteAllReactionsForPost(long postId);
    void deleteAllReactionsFromUser(String username);

    List<ReactionEntity> getReactionsForUser(String username);
}