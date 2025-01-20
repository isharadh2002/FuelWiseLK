package com.example.Back_End.Controller;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Services.FuelQuotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/FuelQuota")
public class FuelQuotaController {

    @Autowired
    private FuelQuotaService fuelQuotaService;

    // Endpoint to get remaining fuel quota for a vehicle
    @GetMapping("/{vehicleId}")
    public VehicleDTO getRemainingFuelQuota(@PathVariable int vehicleId) {
        return fuelQuotaService.getRemainingFuelQuota(vehicleId);
    }

    // Endpoint to update the remaining fuel quota for a vehicle and create a fuel transaction
    @PutMapping("/{vehicleId}")
    public VehicleDTO updateFuelQuota(@PathVariable int vehicleId,
                                      @RequestParam double fuelUsedOrAdded,
                                      @RequestParam String fuelType) {
        return fuelQuotaService.updateFuelQuota(vehicleId, fuelUsedOrAdded, fuelType);
    }
}
