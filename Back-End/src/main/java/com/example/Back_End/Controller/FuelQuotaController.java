package com.example.Back_End.Controller;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Exceptions.FuelQuotaException;
import com.example.Back_End.Services.FuelQuotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/FuelQuota")
public class FuelQuotaController {

    @Autowired
    private FuelQuotaService fuelQuotaService;

    // Endpoint to get remaining fuel quota for a vehicle
    @GetMapping("/getRemainingQuota/{vehicleId}")
    public VehicleDTO getRemainingFuelQuota(@PathVariable int vehicleId) throws FuelQuotaException {
        return fuelQuotaService.getRemainingFuelQuota(vehicleId);
    }

    // Endpoint to update the remaining fuel quota for a vehicle and create a fuel transaction
    @PutMapping("/updateFuelQuota/")
    public VehicleDTO updateFuelQuota(@RequestParam int vehicleId,
                                      @RequestParam double fuelUsedOrAdded,
                                      @RequestParam String fuelType,
                                      @RequestParam int stationId) throws FuelQuotaException {
        return fuelQuotaService.updateFuelQuota(vehicleId, fuelUsedOrAdded, fuelType, stationId);
    }

    @PutMapping("/updateFuelQuota1/{vehicleId}")
    public VehicleDTO updateFuelQuota(@PathVariable int vehicleId,
                                      @RequestBody VehicleDTO vehicleDTO) throws FuelQuotaException {
        return fuelQuotaService.updateFuelQuota(vehicleId, vehicleDTO.getVehicleFuelQuota(), "Petrol", 1);
    }

    @PutMapping("/resetQuota")
    public String resetFuelQuotaForAllVehicles() throws FuelQuotaException {
        return fuelQuotaService.resetFuelQuotaForAllVehicles();
    }
}
