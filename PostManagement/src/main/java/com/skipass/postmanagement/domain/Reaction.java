package com.skipass.postmanagement.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Reaction {
    private long id;
    private long postId;
    private String creator;
}