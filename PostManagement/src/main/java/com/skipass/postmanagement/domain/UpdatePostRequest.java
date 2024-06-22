package com.skipass.postmanagement.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdatePostRequest {
    private long postId;
    private String text;
}