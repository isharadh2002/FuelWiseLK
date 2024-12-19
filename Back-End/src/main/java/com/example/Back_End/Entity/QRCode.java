package com.example.Back_End.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

@Entity
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class QRCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generation of primary key
    @EqualsAndHashCode.Include // Primary key for equality
    private int QRCodeID;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String QRCodeData;

    @OneToOne
    @JoinColumn(name = "vehicle_id", nullable = false) // Foreign key in the QRCode table
    private Vehicle vehicle; // Owning side of the one-to-one relationship
}
