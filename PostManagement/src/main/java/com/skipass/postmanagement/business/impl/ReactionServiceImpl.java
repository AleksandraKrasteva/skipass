package com.skipass.postmanagement.business.impl;

import com.skipass.postmanagement.business.ReactionService;
import com.skipass.postmanagement.domain.CreateReactionRequest;
import com.skipass.postmanagement.persistance.PostRepository;
import com.skipass.postmanagement.persistance.ReactionEntity;
import com.skipass.postmanagement.persistance.ReactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@AllArgsConstructor
public class ReactionServiceImpl implements ReactionService {
    private final ReactionRepository reactionRepository;

    @Override
    public void updateReaction(long reactionId) {
        Optional<ReactionEntity> reaction = reactionRepository.findById(reactionId);
        if(reaction.get().isLike()) {
            reaction.get().setLike(false);
        }else{
            reaction.get().setLike(true);
        }
        reactionRepository.save(reaction.get());
    }
    @Override
    public void deleteReaction(long reactionId) {
        reactionRepository.deleteByIdIs(reactionId);
    }
    @Override
    public long createReaction(CreateReactionRequest request) {
        ReactionEntity reaction = ReactionEntity.builder()
                .creator(request.getCreator()).isLike(request.isLike()).postId(request.getPostId()).build();

        ReactionEntity returned = reactionRepository.save(reaction);
        return returned.getId();
    }
}