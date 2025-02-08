package com.example.Back_End.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuelStationRegisterDTO {

    private String stationName;
    private String stationLocation;
    private String stationContact;
    private int userID;
}
