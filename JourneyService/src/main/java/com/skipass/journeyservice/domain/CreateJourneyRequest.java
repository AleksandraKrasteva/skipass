package com.skipass.journeyservice.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateJourneyRequest {
    String username;
}
