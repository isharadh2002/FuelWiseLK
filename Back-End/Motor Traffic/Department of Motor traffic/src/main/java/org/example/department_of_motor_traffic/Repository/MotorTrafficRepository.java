package org.example.department_of_motor_traffic.Repository;

import org.example.department_of_motor_traffic.Entity.VehicleData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MotorTrafficRepository extends JpaRepository<VehicleData, Integer> {

//    @Query("SELECT v FROM VehicleData v WHERE v.licensePlate = ?1")
    Optional<VehicleData> findByLicensePlate(String licensePlate);
}
