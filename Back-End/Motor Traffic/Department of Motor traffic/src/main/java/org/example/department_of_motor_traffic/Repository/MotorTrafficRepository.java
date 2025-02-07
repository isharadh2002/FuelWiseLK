package org.example.department_of_motor_traffic.Repository;

import org.example.department_of_motor_traffic.Entity.VehicleData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MotorTrafficRepository extends JpaRepository<VehicleData, Integer> {
    Optional<VehicleData> findByLicensePlate(String licensePlate);
}




