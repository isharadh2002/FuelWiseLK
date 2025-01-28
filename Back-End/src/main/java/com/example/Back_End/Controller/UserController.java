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

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable int userId, @RequestBody UserDTO userDTO) {

        try {
            String updatedUserId = userService.updateUser(userId, userDTO);
            return ResponseEntity.ok().body("User updated successfully with ID: " + updatedUserId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user: " + e.getMessage());
        }

    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getUser(@PathVariable int userId) {

        try {
            UserDTO userDTO = userService.getUser(userId);
            return ResponseEntity.ok().body(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting user: " + e.getMessage());
        }

    }



    //Mobile User


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

    @PutMapping("/updateMobileUser/{userId}")
    public ResponseEntity<?> updateMobileUser(@PathVariable int userId, @RequestBody UserDTO userDTO) {

        try {
            String updatedUserId = userService.updateMobileUser(userId, userDTO);
            return ResponseEntity.ok().body("User updated successfully with ID: " + updatedUserId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user: " + e.getMessage());
        }

    }

    @GetMapping("/getMobileUser/{userId}")
    public ResponseEntity<?> getMobileUser(@PathVariable int userId) {

        try {
            UserDTO userDTO = userService.getMobileUser(userId);
            return ResponseEntity.ok().body(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting user: " + e.getMessage());
        }

    }


}
