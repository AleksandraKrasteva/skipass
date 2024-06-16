package com.skipass.journeyservice.business.impl;

import com.skipass.journeyservice.business.JourneyService;
import com.skipass.journeyservice.domain.Journey;
import com.skipass.journeyservice.domain.JourneyType;
import com.skipass.journeyservice.persistance.JourneyEntity;
import com.skipass.journeyservice.persistance.JourneyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@AllArgsConstructor
public class JourneyServiceImpl implements JourneyService {

    private final JourneyRepository journeyRepository;

    @Override
    public Journey createJourney(String authorUsername) {
        Random random = new Random();
        JourneyType[] types = JourneyType.values();
        JourneyType type = types[random.nextInt(types.length)];

        int totalKilometers;
        int totalPasses;
        switch (type) {
            case FULL_DAY:
                totalKilometers =50 + random.nextInt(150);
                totalPasses = 8 + random.nextInt(30);
                break;
            case MORNING:
                totalKilometers = 20 + random.nextInt(60);
                totalPasses = 5 + random.nextInt(15);

                break;
            case AFTERNOON:
                totalKilometers = 15 + random.nextInt(60);
                totalPasses = 5 + random.nextInt(13);
                break;
            case NIGHT:
                totalKilometers = 20 + random.nextInt(70);
                totalPasses = 6 + random.nextInt(20);
                break;
            default:
                totalKilometers = 0;
                totalPasses = 0;
        }

        int fastestRun = 2 + random.nextInt(5);
        int slowestRun = fastestRun + random.nextInt(10);

        LocalDate date = LocalDate.now();

        Journey journey = Journey.builder().authorUsername(authorUsername).date(date).fastest(fastestRun)
                .type(type).slowest(slowestRun).totalKm(totalKilometers).totalPasses(totalPasses).build();
        return journey;
    }

    @Override
    public List<JourneyEntity> getAllForUser(String authorUsername) {
        List<JourneyEntity> journeys = journeyRepository.getJourneyEntitiesByAuthorUsernameIs(authorUsername);
        return journeys;
    }

    @Override
    public JourneyEntity getJourneyById(long journeyId) {
        Optional<JourneyEntity> journey = journeyRepository.findById(journeyId);
        if(journey.isPresent()){
            return journey.get();
        }
        return null;
    }

    @Override
    public void deleteJourneyById(long journeyId) {
        journeyRepository.deleteById(journeyId);
    }

    @Override
    public void deleteJourneysForAuthor(String authorUsername) {
        journeyRepository.deleteAllByAuthorUsernameIs(authorUsername);

    }
}
