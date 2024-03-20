package com.skipass.postmanagement.persistance;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@Table(name = "posts")
@AllArgsConstructor
@NoArgsConstructor
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String text;

    Long userId;

}
