package com.example.Back_End.Controller;

import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.DTO.VehicleOwnerDTO;
import com.example.Back_End.Response.LoginResponse;
import com.example.Back_End.Services.VehicleOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/VehicleOwner")
public class VehicleOwnerController {

    @Autowired
    private VehicleOwnerService vehicleOwnerService;
    @PostMapping(path = "/save")
    public String saveVehicleOwner(@RequestBody VehicleOwnerDTO employeeDTO)

    {
        String id = vehicleOwnerService.addVehicleOwner(employeeDTO);
        return id;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO)

    {
        LoginResponse loginResponse = vehicleOwnerService.loginVehicleOwner(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }



}
