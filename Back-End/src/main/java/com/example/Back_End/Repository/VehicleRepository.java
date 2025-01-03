package com.example.Back_End.Repository;

import com.example.Back_End.Entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

//    Vehicle findByVehicleNumber(String vehicleNumber);
}
