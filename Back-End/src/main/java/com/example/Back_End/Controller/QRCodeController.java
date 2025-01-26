package com.example.Back_End.Controller;

import com.example.Back_End.DTO.QRCodeDTO;
import com.example.Back_End.Services.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/qr")
@CrossOrigin
public class QRCodeController {

    @Autowired
    private QRCodeService qrCodeService;

    @PostMapping("/generate/{vehicleId}")
    public ResponseEntity<QRCodeDTO> generateQRCode(@PathVariable int vehicleId) {
        QRCodeDTO qrCodeDTO = qrCodeService.generateQRCodeForVehicle(vehicleId);
        return ResponseEntity.ok(qrCodeDTO);
    }

    @GetMapping("/{vehicleId}")
    public ResponseEntity<QRCodeDTO> getQRCode(@PathVariable int vehicleId) {
        QRCodeDTO qrCodeDTO = qrCodeService.getQRCodeByVehicleId(vehicleId);
        return ResponseEntity.ok(qrCodeDTO);
    }

    @GetMapping("/scan/{qrCodeData}")
    public ResponseEntity<QRCodeDTO> scanQRCode(@PathVariable String qrCodeData) {
        QRCodeDTO qrCodeDTO = qrCodeService.scanQRCode(qrCodeData);
        return ResponseEntity.ok(qrCodeDTO);
    }
}
