package com.example.Back_End.Controller;

import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.DTO.UserDTO;

import com.example.Back_End.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;









@RestController
@CrossOrigin
@RequestMapping("api/v1/User")
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping(path = "/save")
    public String saveVehicleOwner(@RequestBody UserDTO userDTO)

    {
        String id = userService.addUser(userDTO);
        return id;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO)

    {
        LoginResponse loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}
