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
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented primary key
    @EqualsAndHashCode.Include // Primary key for equality
    @Column(name = "vehicle_id")
    private int vehicleId;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String licensePlate;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String vehicleModel;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private double vehicleFuelQuota;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private VehicleOwner vehicleOwner; // Bidirectional relationship with VehicleOwner

    @OneToOne(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    private QRCode qrCode; // Bidirectional one-to-one with QRCode


    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FuelTransaction> fuelTransactions; // Bidirectional one-to-many with FuelTransaction

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications; // Bidirectional one-to-many with Notification
}
