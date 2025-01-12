package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.QRCodeDTO;
import com.example.Back_End.Entity.QRCode;
import com.example.Back_End.Entity.Vehicle;
import com.example.Back_End.Repository.QRCodeRepository;
import com.example.Back_End.Repository.VehicleRepository;
import com.example.Back_End.Services.QRCodeService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

@Service
public class QRCodeServiceImpl implements QRCodeService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private QRCodeRepository qrCodeRepository;

    @Override
    public QRCodeDTO generateQRCodeForVehicle(int vehicleId) {
        // Find the vehicle
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + vehicleId));

        // Generate QR code data
        String qrData = "Vehicle Number: " + vehicle.getLicensePlate() +
                ", Owner: " + vehicle.getVehicleOwner().getOwnerName();
        String qrCodeBase64 = generateQRCodeBase64(qrData);

        // Save QR code
        QRCode qrCode = new QRCode();
        qrCode.setVehicle(vehicle);
        qrCode.setQRCodeData(qrCodeBase64);
        qrCode = qrCodeRepository.save(qrCode);

        // Return DTO
        QRCodeDTO qrCodeDTO = new QRCodeDTO();
        qrCodeDTO.setVehicleId(vehicleId);
        qrCodeDTO.setQrCodeData(qrCode.getQRCodeData());
        return qrCodeDTO;
    }

    @Override
    public QRCodeDTO getQRCodeByVehicleId(int vehicleId) {
        QRCode qrCode = qrCodeRepository.findByVehicle_VehicleID(vehicleId);
        if (qrCode == null) {
            throw new RuntimeException("No QR Code found for Vehicle ID: " + vehicleId);
        }
        QRCodeDTO qrCodeDTO = new QRCodeDTO();
        qrCodeDTO.setVehicleId(vehicleId);
        qrCodeDTO.setQrCodeData(qrCode.getQRCodeData());
        return qrCodeDTO;
    }

    private String generateQRCodeBase64(String data) {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 300, 300);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
            return Base64.getEncoder().encodeToString(outputStream.toByteArray());
        } catch (WriterException | IOException e) {
            throw new RuntimeException("Failed to generate QR Code", e);
        }
    }
}
