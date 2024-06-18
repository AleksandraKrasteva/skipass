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

    private String username;

    @Nullable
    @JoinColumn(name="reaction_id", nullable = true)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ReactionEntity> reactions;

    private long journeyId;

}
