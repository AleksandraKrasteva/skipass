package com.skipass.usermanagement.repository;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@Table(name="users")
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;
    private String email;

//    private Enum type;

}
