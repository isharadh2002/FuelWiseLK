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


    ResponseEntity<Object> updateVehicle(@RequestBody Vehicle vehicle, @PathVariable int id);

    Vehicle deleteVehicle(Vehicle vehicle);






    void updateQuota(@RequestBody Vehicle vehicle, @PathVariable double remainings) throws Exception;

    List<VehicleDTO> getAllVehicles();
}
