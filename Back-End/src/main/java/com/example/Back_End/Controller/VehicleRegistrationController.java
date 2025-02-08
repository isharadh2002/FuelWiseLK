package com.example.Back_End.Controller;

import com.example.Back_End.DTO.VehicleRegistrationDTO;
import com.example.Back_End.Entity.Vehicle;
import com.example.Back_End.Services.Validation;
import com.example.Back_End.Services.VehicleOwnerService;
import com.example.Back_End.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** @noinspection ALL*/
@RestController
@CrossOrigin
@RequestMapping("api/v1/VehicleForm")

public class VehicleRegistrationController {
    /**
     *
     */
   @Autowired
    public VehicleService vehicleService;

    public final Validation validation;
    public final VehicleOwnerService vehicleOwnerService;
    @Autowired
    public VehicleRegistrationController(VehicleOwnerService vehicleOwnerService, Validation validation) {

        this.validation = validation;
        this.vehicleOwnerService=vehicleOwnerService;
    }


   @GetMapping("/getAllVehicles")
    public List<VehicleRegistrationDTO> getAllVehicle(){
       return vehicleService.getAllVehicle();

   }
    @PostMapping("/addVehicle")
    public ResponseEntity<String> saveVehicle(@RequestBody VehicleRegistrationDTO vehicleRegistrationDTO) {
        try {
            int userId=vehicleRegistrationDTO.getOwnerId();
            int realOwnerId=vehicleOwnerService.getOwnerID(userId);
            vehicleRegistrationDTO.setOwnerId(realOwnerId);
            if (validation.vehicleValidation(vehicleRegistrationDTO)) {
                vehicleService.saveVehicle(vehicleRegistrationDTO);
                return ResponseEntity.ok("Vehicle added successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid vehicle data");
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }
    @PutMapping("/updateVehicle?id={id}")
    public ResponseEntity<Vehicle> updateVehicle(@RequestBody Vehicle vehicle, @PathVariable int id) {
        return vehicleService.updateVehicle(vehicle, id);
    }

    @DeleteMapping("/deleteData/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable int id) {
        return vehicleService.deleteVehicle(id);
    }
   @PutMapping("/query?id={quata}")
    public void updateQuots(@RequestBody Vehicle vehicle,@PathVariable double quoata) throws Exception {
       vehicleService.updateQuota(vehicle, quoata);
   }












}