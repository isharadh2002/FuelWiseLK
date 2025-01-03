package com.example.Back_End.Entity;

import jakarta.persistence.*;
import lombok.*;

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
    private Integer ownerID;

    @Column(name = "owner_name", nullable = false) // Ensure not null
    @ToString.Include
    private String ownerName;

    @Column(name = "email", nullable = false, unique = true) // Email must be unique
    @ToString.Include
    private String email;

    @Column(name = "password", nullable = false)
    private String password; // Excluded from ToString

    @Column(name = "owner_phone")
    @ToString.Include
    private String ownerPhone;

    @OneToMany(mappedBy = "vehicleOwner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vehicle> vehicles; // Bidirectional relationship



}
