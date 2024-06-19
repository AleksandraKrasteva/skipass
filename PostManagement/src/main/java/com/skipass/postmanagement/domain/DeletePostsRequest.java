package com.skipass.postmanagement.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeletePostsRequest {
    private String username;
    private boolean deleteJourney;
}