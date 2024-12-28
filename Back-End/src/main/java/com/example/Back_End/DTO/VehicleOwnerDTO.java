package com.example.Back_End.DTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleOwnerDTO {

    private String ownerName;
    private String ownerEmail;
    private String ownerPassword;
    private String ownerPhone;
    
}
