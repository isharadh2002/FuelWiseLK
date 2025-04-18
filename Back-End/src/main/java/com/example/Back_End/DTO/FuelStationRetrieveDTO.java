package com.example.Back_End.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuelStationRetrieveDTO {

    private int stationID;
    private String stationName;
    private String stationLocation;
    private String stationContact;
    private int userID;

}
