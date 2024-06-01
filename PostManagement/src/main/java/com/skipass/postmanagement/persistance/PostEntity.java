package com.skipass.postmanagement.persistance;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Builder
@Table(name = "posts")
@AllArgsConstructor
@NoArgsConstructor
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String text;

    private String userEmail;

    @Nullable
    @JoinColumn(name="reactions", nullable = true)
    @OneToMany()
    private List<ReactionEntity> reactions;

}
