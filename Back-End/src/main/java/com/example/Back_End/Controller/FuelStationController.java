package com.example.Back_End.Controller;

import com.example.Back_End.DTO.FuelStationDTO;
import com.example.Back_End.DTO.FuelStationRegisterDTO;
import com.example.Back_End.DTO.FuelStationRetrieveDTO;
import com.example.Back_End.Exceptions.FuelStationException;
import com.example.Back_End.Services.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/FuelStation")
public class FuelStationController {

    @Autowired
    private FuelStationService fuelStationService;

    @PostMapping("/save")
    public ResponseEntity<?> saveFuelStation(@RequestBody FuelStationRegisterDTO fuelStationRegisterDTO) {
        try {
            String message = fuelStationService.addFuelStation(fuelStationRegisterDTO);
            return ResponseEntity.ok().body(Collections.singletonMap("message", message));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @GetMapping(path = "/get")
    public FuelStationDTO getFuelStation(@RequestBody String stationName) throws Exception {

        return fuelStationService.getFuelStation(stationName);

    }

    @GetMapping(path = "/getByID/{stationID}")
    public FuelStationDTO getFuelStationByID(@PathVariable int stationID) throws FuelStationException {

        return fuelStationService.getFuelStationByID(stationID);

    }

    @GetMapping("/getStations")
    public List<FuelStationRetrieveDTO> getUsers() {
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

    @DeleteMapping(path = "/deleteByID/{stationID}")
    public String deleteFuelStationByID(@PathVariable int stationID) throws FuelStationException {
        return fuelStationService.deleteFuelStation(stationID);
    }

    @GetMapping("/getStationID/{UserID}")
    public int getStationIDByUserID(@PathVariable int UserID) throws FuelStationException {
        return fuelStationService.getStaionIDByUserID(UserID);
    }
    
}
