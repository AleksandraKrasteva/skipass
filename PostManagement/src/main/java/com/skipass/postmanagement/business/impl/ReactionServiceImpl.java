package com.skipass.postmanagement.business.impl;

import com.skipass.postmanagement.business.ReactionService;
import com.skipass.postmanagement.domain.CreateReactionRequest;
import com.skipass.postmanagement.persistance.PostEntity;
import com.skipass.postmanagement.persistance.PostRepository;
import com.skipass.postmanagement.persistance.ReactionEntity;
import com.skipass.postmanagement.persistance.ReactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor
public class ReactionServiceImpl implements ReactionService {
    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;

    @Override
    public void deleteReaction(long reactionId) {
        System.out.println(reactionId);
        reactionRepository.deleteById(reactionId);
//        reactionRepository.deleteByIdIs(reactionId);
    }
    @Override
    public long createReaction(CreateReactionRequest request) {
        ReactionEntity reaction = ReactionEntity.builder().creator(request.getCreator()).postId(request.getPostId()).build();
        ReactionEntity returned = reactionRepository.save(reaction);
        return returned.getId();
    }
}