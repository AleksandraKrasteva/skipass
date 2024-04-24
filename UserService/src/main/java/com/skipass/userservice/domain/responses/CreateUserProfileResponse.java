package com.skipass.userservice.domain.responses;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CreateUserProfileResponse {
    private long id;
}
