package com.skipass.postmanagement.domain;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Post {
    private long id;
    private String text;
    private String username;
    private List<Reaction> reactions;
    private long journeyId;
}