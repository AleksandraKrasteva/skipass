package com.skipass.postmanagement.persistance;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> getPostEntitiesByUserIdIs(long userId);

    @Transactional
    void deletePostEntitiesByUserIdIs(long userId);

}
