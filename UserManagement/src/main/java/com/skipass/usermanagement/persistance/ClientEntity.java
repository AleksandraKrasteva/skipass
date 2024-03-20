package com.skipass.usermanagement.persistance;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Data
@Builder
@Table(name = "clients")
@AllArgsConstructor
@NoArgsConstructor
public class ClientEntity {
    @Id
    @Generated
    private Long id;

    private Enum type;

}
