package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.VehicleRegistrationDTO;
import com.example.Back_End.Services.Validation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Validationimpl implements Validation {





    private RestTemplate restTemplate;
    public Validationimpl(RestTemplate restTemplate){
        this.restTemplate=restTemplate;
    }
    public boolean vehicleValidation(VehicleRegistrationDTO vehicleDTO) {
        String urlToApi = "http://localhost:8085/api/v1/vehicles/validate"; // Corrected URL


        ResponseEntity<Boolean> response = restTemplate.getForEntity(urlToApi + "?licensePlate=" + vehicleDTO.getLicensePlate(), Boolean.class);

        return response.getBody() != null && response.getBody();
    }




}
