package com.skipass.journeyservice.business;

import com.skipass.journeyservice.domain.Journey;
import com.skipass.journeyservice.persistance.JourneyEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JourneyService {
    Journey createJourney(String authorUsername);

    List<JourneyEntity> getAllForUser(String authorUsername);

    JourneyEntity getJourneyById(long journeyId);

    void deleteJourneyById(long journeyId);

    void deleteJourneysForAuthor(String authorUsername);
}