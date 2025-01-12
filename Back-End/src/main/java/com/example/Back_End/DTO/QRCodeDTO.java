package com.example.Back_End.DTO;

import lombok.Data;

@Data
public class QRCodeDTO {
    private int vehicleId;
    private String qrCodeData; // Base64 string of the QR Code
}
