package com.example.Back_End.Entity;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate primary key
    @EqualsAndHashCode.Include
    private int id;

    @ToString.Include
    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    @ToString.Include
    private String email;

    @Column( nullable = false)
    @ToString.Include
    private String phone;

    @Column(nullable = false)
    @ToString.Include
    private String password;

    @Column(nullable = false)
    @ToString.Include
    private String role; // Example: 'vehicle_owner', 'fuel_station'

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    // Bidirectional relationship with FuelStation
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private FuelStation fuelStation;

    // Bidirectional relationship with VehicleOwner
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private VehicleOwner vehicleOwner;

}
