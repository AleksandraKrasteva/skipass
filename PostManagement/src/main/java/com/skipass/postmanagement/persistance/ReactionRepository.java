package com.skipass.postmanagement.persistance;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReactionRepository extends JpaRepository<ReactionEntity, Long> {
    List<ReactionEntity> getReactionEntitiesByPostIdIs(long postId);
    void deleteByIdIs(long id);
}
