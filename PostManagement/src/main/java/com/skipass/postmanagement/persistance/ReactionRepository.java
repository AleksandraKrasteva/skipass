package com.skipass.postmanagement.persistance;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<ReactionEntity, Long> {
    List<ReactionEntity> getReactionEntitiesByPostIdIs(long postId);
    void deleteAllByPostIdIs(long postId);
    void deleteAllByCreatorIs(String username);

    List<ReactionEntity> getReactionEntitiesByCreatorIs(String username);
}
