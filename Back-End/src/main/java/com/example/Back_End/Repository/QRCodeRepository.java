package com.example.Back_End.Repository;

import com.example.Back_End.Entity.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QRCodeRepository extends JpaRepository<QRCode, Integer> {
    QRCode findByVehicle_VehicleId(int vehicleId);
}
