package com.example.Back_End.Controller;

import com.example.Back_End.DTO.VehicleRegistrationDTO;
import com.example.Back_End.Entity.Vehicle;
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




   @GetMapping("/getAllVehicles")
    public List<VehicleRegistrationDTO> getAllVehicle(){
       return vehicleService.getAllVehicle();

   }
   @PostMapping("/addVehicle")
    public VehicleRegistrationDTO saveVehicle(@RequestBody VehicleRegistrationDTO vehicleRegistrationDTO){
     return vehicleService.saveVehicle(vehicleRegistrationDTO);
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