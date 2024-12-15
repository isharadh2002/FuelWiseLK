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
public class MotorTrafficDB {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented primary key
    @EqualsAndHashCode.Include // Use the primary key for equality
    @Column(name = "traffic_id" )
    private Integer trafficId;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String licensePlate;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String vehicleModel;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String ownerName;

    @OneToMany(mappedBy = "motorTrafficDB", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vehicle> vehicles; // Bidirectional one-to-many with Vehicle
}
