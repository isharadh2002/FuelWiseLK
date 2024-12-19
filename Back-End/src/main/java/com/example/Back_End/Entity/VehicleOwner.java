package com.example.Back_End.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;
import java.util.List;

@Entity
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class VehicleOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented primary key
    @Column(name = "owner_id") // Explicit column name in DB
    @EqualsAndHashCode.Include // Primary key for equality
    private Long ownerID;

    @Column(name = "owner_name", nullable = false) // Ensure not null
    @ToString.Include
    private String ownerName;

    @Column(name = "owner_email", nullable = false, unique = true) // Email must be unique
    @ToString.Include
    private String ownerEmail;

    @Column(name = "owner_password", nullable = false)
    private String ownerPassword; // Excluded from ToString

    @Column(name = "owner_phone")
    @ToString.Include
    private String ownerPhone;

    @OneToMany(mappedBy = "vehicleOwner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vehicle> vehicles; // Bidirectional relationship

    // Optional: Add custom setter for password hashing
    public void setOwnerPassword(String ownerPassword) {
        // Hash the password before storing (use a proper library like BCrypt)
        this.ownerPassword = ownerPassword; // Placeholder for actual hashing logic
    }
}
