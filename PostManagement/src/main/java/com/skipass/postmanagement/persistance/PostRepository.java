package com.skipass.postmanagement.persistance;

import jakarta.transaction.Transactional;
import org.aspectj.weaver.loadtime.Options;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> getPostEntitiesByUsernameIs(String username);
    @Transactional
    void deletePostEntitiesByUsernameIs(String username);
    Optional<PostEntity> getPostEntityByJourneyIdIs(long journeyId);
}