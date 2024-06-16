package com.skipass.postmanagement.business;

import com.skipass.postmanagement.domain.CreateReactionRequest;
import org.springframework.stereotype.Service;

@Service
public interface ReactionService {
    void deleteReaction(long reactionId);
    long createReaction(CreateReactionRequest request);
}