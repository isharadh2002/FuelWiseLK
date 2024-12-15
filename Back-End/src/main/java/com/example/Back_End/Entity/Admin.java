package com.example.Back_End.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generated primary key
    @EqualsAndHashCode.Include // Include in equality checks
    private Long adminID;

    @Column(nullable = false) // Ensure the name is not null
    @ToString.Include
    private String adminName;

    @Column(nullable = false, unique = true) // Email must be unique and not null
    @ToString.Include
    private String email;

    @Column(nullable = false) // Password must not be null
    private String password;

    /**
     * Hash the password before persisting.
     */
    @PrePersist
    @PreUpdate
    private void hashPassword() {
        if (this.password != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            this.password = passwordEncoder.encode(this.password);
        }
    }
}
