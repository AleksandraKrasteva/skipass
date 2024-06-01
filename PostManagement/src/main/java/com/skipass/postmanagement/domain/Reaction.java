package com.skipass.postmanagement.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Reaction {
    private long id;
    private int postId;
    private int creator;
    private boolean isLike;
}
