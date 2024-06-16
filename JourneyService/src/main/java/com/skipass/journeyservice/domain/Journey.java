package com.skipass.journeyservice.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
public class Journey {
    private long id;
    private String authorUsername;
    private JourneyType type;
    private float totalKm;
    private double fastest;
    private double slowest;
    private LocalDate date;
    private int totalPasses;
}

