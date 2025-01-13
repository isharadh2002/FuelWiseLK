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

    @Column(nullable = false, columnDefinition = "TEXT") // Base64-encoded QR code
    private String QRCodeData;

    @Column(nullable = false)
    private String referenceId; // This will store a unique reference like vehicle ID or custom data
}
