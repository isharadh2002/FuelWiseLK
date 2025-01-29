package com.example.Back_End.Controller;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
