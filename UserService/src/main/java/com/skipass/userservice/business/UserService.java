package com.skipass.userservice.business;

import com.skipass.userservice.persistance.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    List<UserEntity> getAllUsers();
}
