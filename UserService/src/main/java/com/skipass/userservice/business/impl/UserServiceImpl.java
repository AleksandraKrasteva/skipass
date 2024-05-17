package com.skipass.userservice.business.impl;

import com.skipass.userservice.business.UserService;
import com.skipass.userservice.persistance.UserEntity;
import com.skipass.userservice.persistance.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public List<UserEntity> getAllUsers() {
        try{
        List<UserEntity> users = userRepository.findAll();
        return users;

        }
        catch(Exception e){
            System.out.print(e);
        }
        return null;
    }
}
