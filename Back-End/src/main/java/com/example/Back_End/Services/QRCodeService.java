package com.example.Back_End.Services;

import com.example.Back_End.DTO.QRCodeDTO;

public interface QRCodeService {
    QRCodeDTO generateQRCodeForVehicle(int vehicleId);
    QRCodeDTO getQRCodeByVehicleId(int vehicleId);
    QRCodeDTO scanQRCode(String qrCodeData);  // Added method to scan QR code
}
