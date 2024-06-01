package com.skipass.postmanagement.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Post {
    private long id;

    private String text;

    private String userEmail;

}
