package com.skipass.userservice.domain.requests;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeleteUserProfileRequest {
    private long userID;
}
