package com.example.Back_End.DTO;

import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Entity.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FuelTransactionDTO {
    private int transactionID;
    private String remainingQuota;
    private String pumpedLitres;
    private String fuelType;
    private LocalDateTime transactionTime;
    private int vehicleID;
    private int stationID;
}
