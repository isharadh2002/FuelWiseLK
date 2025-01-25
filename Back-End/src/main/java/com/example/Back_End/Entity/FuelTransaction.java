package com.example.Back_End.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class FuelTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generation of primary key
    @EqualsAndHashCode.Include // Primary key for equality
    private int transactionID;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String remainingQuota;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String pumpedLitres;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String fuelType;

    @Column(nullable = false, updatable = false) // Ensure not null and not editable after creation
    @ToString.Include
    private LocalDateTime transactionTime;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false) // Foreign key in FuelTransaction table
    private Vehicle vehicle; // Many transactions can be linked to one vehicle

    @ManyToOne
    @JoinColumn(name = "station_id", nullable = false) // Foreign key in FuelTransaction table
    private FuelStation fuelStation; // Many transactions can occur at one fuel station

    @PrePersist
    protected void onCreate() {
        this.transactionTime = LocalDateTime.now();
    }
}
