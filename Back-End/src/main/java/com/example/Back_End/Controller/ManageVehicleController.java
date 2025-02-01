package com.example.Back_End.Controller;

import com.example.Back_End.DTO.UpdateVehicleDTO;
import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Services.ManageVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/manage-vehicle") // Base URL for vehicle management
@CrossOrigin
public class ManageVehicleController {

    @Autowired
    private ManageVehicleService manageVehicleService;

    // Get a vehicle by ID
    @GetMapping("/{id}")
    public ResponseEntity<VehicleDTO> getVehicleById(@PathVariable int id) {
        return ResponseEntity.ok(manageVehicleService.getVehicleById(id));
    }

    // Update vehicle settings
    @PutMapping("/update/{id}")
    public ResponseEntity<VehicleDTO> updateVehicle(@PathVariable int id, @RequestBody UpdateVehicleDTO updateVehicleDTO) {
        return ResponseEntity.ok(manageVehicleService.updateVehicleSettings(id, updateVehicleDTO));
    }

    // Delete a vehicle
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable int id) {
        manageVehicleService.deleteVehicle(id);
        return ResponseEntity.ok("Vehicle deleted successfully.");
    }
}
