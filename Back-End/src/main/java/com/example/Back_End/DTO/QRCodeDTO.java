package com.example.Back_End.DTO;

import lombok.Data;

@Data
public class QRCodeDTO {
    private int qrCodeId;
    private String qrCodeData;
    private int vehicleId;
}
