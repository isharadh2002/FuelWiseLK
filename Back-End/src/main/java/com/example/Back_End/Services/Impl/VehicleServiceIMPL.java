package com.example.Back_End.Services.Impl;

import com.example.Back_End.Entity.Vehicle;
import com.example.Back_End.Repository.VehicleRepository;
import com.example.Back_End.Services.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public class VehicleServiceIMPL implements VehicleService {

    VehicleRepository vehicleRepository;
    @Override
    public List<Vehicle> getAllVehicle(){


    return  vehicleRepository.findAll();
    }

    @Override
    public Vehicle saveVehicle(@RequestBody Vehicle vehicle) {

        return vehicleRepository.save(vehicle);
    }








    @Override
    public ResponseEntity<Object> updateVehicle(@RequestBody Vehicle vehicle,  int id) {

        if (! vehicleRepository.equals(vehicle)){
            return ResponseEntity.notFound().build();
        }
        vehicle.setVehicleId(id);
        vehicleRepository.save(vehicle);
        return ResponseEntity.noContent().build();
    }

    @Override
    public Vehicle deleteVehicle(@RequestBody Vehicle vehicle) {
        vehicleRepository.delete(vehicle);
        return vehicle;
    }

    @Override
    public void updateQuota(@RequestBody Vehicle vehicle, @PathVariable double remainings) throws Exception {
       if(!vehicleRepository.equals(vehicle.getVehicleId())){
           throw new Exception("There is not value like you entered!...");

       }
       vehicle.setVehicleFuelQuota(remainings);
       vehicleRepository.save(vehicle);

    }


}