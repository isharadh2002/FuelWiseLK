package com.example.Back_End.Controller;

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
    public List<Vehicle> getAllVehicle(){
       return vehicleService.getAllVehicle();

   }
   @PostMapping("/addVehicle")
    public Vehicle saveVehicle(@RequestBody Vehicle vehicle){
     return vehicleService.saveVehicle(vehicle);
   }
   @PutMapping("/updateVehicle?id={id}")
    public void updateVehicle(@RequestBody Vehicle vehicle,@PathVariable int id){
       ResponseEntity<Object> newvehicle=vehicleService.updateVehicle(vehicle,id);
       vehicleService.updateVehicle(vehicle,id);
       return;
   }
   @DeleteMapping("/deleteData?id={id}")
    public Vehicle deleteVehicle(@RequestBody Vehicle vehicle, @PathVariable int id){
       return vehicleService.deleteVehicle(vehicle);
   }
   @PutMapping("/query?id={quata}")
    public void updateQuots(@RequestBody Vehicle vehicle,@PathVariable double quoata) throws Exception {
       vehicleService.updateQuota(vehicle, quoata);
   }











}