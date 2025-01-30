package com.example.Back_End.Services;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Entity.Vehicle;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface VehicleService {
    //Crud Operations
    //Update the remaining Quota of the vehicle

    Optional<VehicleDTO> getVehicleById(int vehicleId);
    List<Vehicle> getAllVehicle();

    Vehicle saveVehicle(Vehicle vehicle);

    ResponseEntity<String> deleteVehicle(@PathVariable int vehicleId);
    ResponseEntity<Vehicle> updateVehicle(@RequestBody Vehicle vehicle,@PathVariable int id);


    void updateQuota(@RequestBody Vehicle vehicle, @PathVariable double remainings) throws Exception;

    List<VehicleDTO> getAllVehicles();

    void updateFuelQuota(int id, double fuelQuota) throws Exception;

}
