package com.example.Back_End.Controller;

import com.example.Back_End.DTO.FuelStationDTO;
import com.example.Back_End.Exceptions.FuelStationException;
import com.example.Back_End.Services.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/FuelStation")
public class FuelStationController {

    @Autowired
    private FuelStationService fuelStationService;

    @PostMapping(path = "/save")
    public String saveFuelStation(@RequestBody FuelStationDTO fuelStationDTO) {

        return fuelStationService.addFuelStation(fuelStationDTO);

    }

    @GetMapping(path = "/get")
    public FuelStationDTO getFuelStation(@RequestBody String stationName) throws Exception {

        return fuelStationService.getFuelStation(stationName);

    }

    @GetMapping("/getStations")
    public List<FuelStationDTO> getUsers() {
        return fuelStationService.getAllFuelStations();
    }


    @PutMapping(path = "/update/{stationID}")
    public FuelStationDTO updateStationOwner(@PathVariable int stationID, @RequestBody FuelStationDTO fuelStationDTO) throws FuelStationException {
        return fuelStationService.updateFuelStation(stationID, fuelStationDTO);
    }

    @PutMapping(path = "/update")
    public FuelStationDTO updateStationOwnerByName(@RequestBody FuelStationDTO fuelStationDTO) throws FuelStationException {
        return fuelStationService.updateFuelStation(fuelStationDTO);
    }

    @DeleteMapping(path = "/delete/{stationName}")
    public String deleteFuelStation(@PathVariable String stationName) throws FuelStationException {
        return fuelStationService.deleteFuelStation(stationName);
    }



    
}
