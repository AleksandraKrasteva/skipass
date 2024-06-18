package com.skipass.journeyservice.controllers;

import com.skipass.journeyservice.business.JourneyService;
import com.skipass.journeyservice.domain.CreateJourneyRequest;
import com.skipass.journeyservice.domain.Journey;
import com.skipass.journeyservice.persistance.JourneyEntity;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class JourneyController {
    private final JourneyService journeyService;

    @PostMapping("/create-journey")
    public ResponseEntity<JourneyEntity> createJourney(@RequestBody String username){
        System.out.println(username);
        System.out.println(username.substring(1, username.length()));
        String usernameFormed = username.substring(1, username.length());
        JourneyEntity journey = journeyService.createJourney(usernameFormed);
        return ResponseEntity.ok().body(journey);
    }

    @GetMapping("/view-journey/{id}")
    public ResponseEntity<JourneyEntity> getJourneyById(@PathVariable(value = "id") long id) {
        JourneyEntity journey = journeyService.getJourneyById(id);
        return ResponseEntity.ok().body(journey);
    }

    @GetMapping("/view-journeys-user/{username}")
    public ResponseEntity<List<JourneyEntity>> getJourneysForUser(@PathVariable(value = "username") String username) {
        username.toString()
        List<JourneyEntity> journeys = journeyService.getAllForUser(username);
        return ResponseEntity.ok().body(journeys);
    }

    @DeleteMapping("/delete-journey/{id}")
    public ResponseEntity deleteJourneyById(@PathVariable(value = "id") long id) {
        journeyService.deleteJourneyById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete-journeys-user/{username}")
    public ResponseEntity deleteJourneysForUser(@PathVariable(value = "username") String username) {
        journeyService.deleteJourneysForAuthor(username);
        return ResponseEntity.ok().build();
    }
}