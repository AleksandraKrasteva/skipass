package com.skipass.postmanagement.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateReactionRequest {
    private long postId;
    private boolean isLike;
    private String creator;
}