package com.example.Back_End.Repository;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Entity.Vehicle;
import com.example.Back_End.Entity.VehicleOwner;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    // Find a vehicle by its ID
    @Override
    Optional<Vehicle> findById(Integer vehicleId);

    //    Vehicle findByVehicleNumber(String vehicleNumber);

    @Modifying
    @Query(value = "UPDATE `vehicle` SET `vehicle_fuel_quota`=50 WHERE 1", nativeQuery = true)
    void resetFuelQuota();

    List<Vehicle> findAllByVehicleOwner(VehicleOwner vehicleOwner);
}
