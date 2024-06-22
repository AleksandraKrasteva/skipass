package com.skipass.journeyservice.persistance;

import com.skipass.journeyservice.domain.JourneyType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@Builder
@Table(name = "journey")
@AllArgsConstructor
@NoArgsConstructor
public class JourneyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String authorUsername;
    private JourneyType type;
    private float totalKm;
    private double fastest;
    private double slowest;
    private LocalDate date;
    private int totalPasses;
}
