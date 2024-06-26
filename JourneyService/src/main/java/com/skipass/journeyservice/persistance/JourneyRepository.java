package com.skipass.journeyservice.persistance;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository

public interface JourneyRepository extends JpaRepository<JourneyEntity, Long> {
    List<JourneyEntity> getJourneyEntitiesByAuthorUsernameIs(String authorUsername);
    @Transactional
    void deleteAllByIdIs(long journeyId);
    @Transactional
    void deleteAllByAuthorUsernameIs(String authorUsername);

}