package com.skipass.userservice.domain.requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class CreateUserProfileRequest {
    private String username;
    private String email;

}
