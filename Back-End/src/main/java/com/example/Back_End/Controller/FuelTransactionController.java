package com.example.Back_End.Controller;

import com.example.Back_End.DTO.FuelTransactionDTO;
import com.example.Back_End.Services.FuelTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/FuelTransaction")
@CrossOrigin
public class FuelTransactionController {
    @Autowired
    FuelTransactionService fuelTransactionService;

    @GetMapping("/getTransactions/{stationID}")
    public List<FuelTransactionDTO> getFuelTransaction(@PathVariable int stationID) {
        return fuelTransactionService.retrieveFuelTransactionsByStationID(stationID);
    }
}
