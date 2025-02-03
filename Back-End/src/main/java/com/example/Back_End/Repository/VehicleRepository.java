package com.example.Back_End.Repository;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    // Find a vehicle by its ID
    Optional<Vehicle> findById(Integer vehicleId);

    //    Vehicle findByVehicleNumber(String vehicleNumber);
     boolean vehicleValidation(VehicleDTO vehicleDTO);
}
