package com.skipass.postmanagement.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreatePostRequest {
    private String text;
    private String username;
    private long journeyId;
}