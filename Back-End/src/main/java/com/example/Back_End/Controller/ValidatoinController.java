package com.example.Back_End.Controller;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Services.Validation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/vehicles")
public class ValidatoinController {

 private Validation validation;
    @GetMapping("/validate")
     String vehicleValidation(@RequestBody VehicleDTO vehicleDTO) {
        boolean isvalid = validation.vehicleValidation(vehicleDTO);
        if (isvalid) {
            return "Validation Success!";
        }

        return "Validation error!";
    }
}
