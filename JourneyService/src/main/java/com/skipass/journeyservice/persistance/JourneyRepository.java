package com.skipass.journeyservice.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository

public interface JourneyRepository extends JpaRepository<JourneyEntity, Long> {

    List<JourneyEntity> getJourneyEntitiesByAuthorUsernameIs(String authorUsername);

    void deleteAllByIdIs(long journeyId);
    void deleteAllByAuthorUsernameIs(String authorUsername);

}

