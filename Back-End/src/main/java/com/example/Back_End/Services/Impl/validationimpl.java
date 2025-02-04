package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Services.Validation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class validationimpl implements Validation {





    final RestTemplate restTemplate=new RestTemplate();
    public boolean vehicleValidation(VehicleDTO vehicleDTO){
        String urlToApi="https://example.org/v1/api/validate";
        ResponseEntity<Boolean> response=restTemplate.getForEntity(urlToApi,Boolean.class);


        return  response.getBody() != null && response.getBody();
    }

}
