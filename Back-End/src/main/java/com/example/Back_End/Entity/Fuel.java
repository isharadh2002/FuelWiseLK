package com.example.Back_End.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Fuel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fuel_id") // Explicit column name for primary key
    private int id;

    @NotNull
    @Column(name = "fuel_type", nullable = false)
    private String fuelType;

    @NotNull
    @Column(name = "fuel_price", nullable = false)
    private Double fuelPrice;

    @NotNull
    @Column(name = "fuel_quantity", nullable = false)
    private Double fuelQuantity;

    @ManyToOne
    @JoinColumn(name = "station_id", nullable = false) // Maps to the FuelStation entity
    private FuelStation station;
}
