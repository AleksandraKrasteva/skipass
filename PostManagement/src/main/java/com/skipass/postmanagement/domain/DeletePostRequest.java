package com.skipass.postmanagement.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeletePostRequest {
    private long postId;
    private boolean deleteJourney;
}
