package com.example.Back_End.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class QRCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int QRCodeID;

    @Column(nullable = false, columnDefinition = "TEXT") // Store Base64 QR code
    private String QRCodeData;

    @OneToOne
    @JoinColumn(name = "vehicle_id", nullable = false) // Foreign key for vehicle
    private Vehicle vehicle;
}
