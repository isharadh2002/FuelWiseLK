package com.example.Back_End.Services.Impl;
import org.springframework.web.client.RestTemplate;

import com.example.Back_End.DTO.VehicleRegistrationDTO;
import com.example.Back_End.Services.Validation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
@Service
public class Validationimpl implements Validation {





    private RestTemplate restTemplate;
    public Validationimpl(RestTemplate restTemplate){
        this.restTemplate=restTemplate;
    }
    public boolean vehicleValidation(VehicleRegistrationDTO vehicleDTO){
        String urlToApi="http://localhost:8085/v1/api/vehicles/validate";
        ResponseEntity<Boolean> response=restTemplate.postForEntity(urlToApi,vehicleDTO,Boolean.class);


        return  response.getBody() != null && response.getBody();
    }

}
