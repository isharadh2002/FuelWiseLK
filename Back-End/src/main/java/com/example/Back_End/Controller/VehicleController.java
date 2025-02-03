package com.example.Back_End.Controller;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.DTO.VehicleRegistrationDTO;
import com.example.Back_End.Exceptions.VehicleRegistrationException;
import com.example.Back_End.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Back_End.Entity.Vehicle;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vehicles")
@CrossOrigin
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // Get all vehicles
    @GetMapping
    public ResponseEntity<List<VehicleDTO>> getAllVehicles() {
        List<VehicleDTO> vehicles = vehicleService.getAllVehicles();
        if (vehicles.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 if no vehicles
        }
        return ResponseEntity.ok(vehicles); // Return 200 with the list of vehicles
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewVehicle(@RequestBody VehicleRegistrationDTO vehicleRegistrationDTO) {
        try {
            VehicleRegistrationDTO savedVehicle = vehicleService.saveVehicle(vehicleRegistrationDTO);
            return ResponseEntity.ok().body("Vehicle saved successfully");
        } catch (VehicleRegistrationException e) {
            return ResponseEntity.status(500).body("Error saving vehicle: " + e.getMessage());
        }
    }


    // Get vehicle by ID
    @GetMapping(path = "/{id}")
    public ResponseEntity<VehicleDTO> getVehicleById(@PathVariable int id) {
        Optional<VehicleDTO> vehicleDTO = vehicleService.getVehicleById(id);
        return vehicleDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update-fuel-quota/{id}")
    public ResponseEntity<String> updateFuelQuota(@PathVariable int id, @RequestBody Double fuelQuota) {
        try {
            vehicleService.updateFuelQuota(id, fuelQuota);
            return ResponseEntity.ok("Fuel quota updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Vehicle not found with ID: " + id);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable int id, @RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicle(vehicle, id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable int id) {
        return vehicleService.deleteVehicle(id);
    }

}
