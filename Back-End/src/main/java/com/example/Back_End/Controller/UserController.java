package com.example.Back_End.Controller;

import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.DTO.UserDTO;
import com.example.Back_End.Response.LoginResponse;
import com.example.Back_End.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin // Adjust allowed origins or methods as needed
@RequestMapping("api/v1/User")
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody UserDTO userDTO) {

        try {
            String userId = userService.addUser(userDTO);
            return ResponseEntity.ok().body("User saved successfully with ID: " + userId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving user: " + e.getMessage());
        }

    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO)

    {
        LoginResponse loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/RegMobileUser")
    public ResponseEntity<?> saveMobileUser(@RequestBody UserDTO userDTO) {

        try {
            String userId = userService.addMobileUser(userDTO);
            return ResponseEntity.ok().body("User saved successfully with ID: " + userId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving user: " + e.getMessage());
        }

    }

    @PostMapping(path = "/loginMobileUser")
    public ResponseEntity<?> loginMobileUser(@RequestBody LoginDTO loginDTO)

    {
        LoginResponse loginResponse = userService.loginMobileUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }


}
