package com.example.Back_End.Controller;

import com.example.Back_End.DTO.VehicleRegistrationDTO;
import com.example.Back_End.Services.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/VehicleForm")
public class ValidatoinController {
  private final Validation validation;

  @Autowired
  public ValidatoinController(Validation validation){
      this.validation=validation;
  }

    @PostMapping("/validate")
     boolean vehicleValidation(@RequestBody VehicleRegistrationDTO vehicleDTO) {
        boolean isvalid = validation.vehicleValidation(vehicleDTO);
        if (isvalid) {

            return true;
        }

        return false;
    }
}
