package com.example.Back_End.Controller;

import com.example.Back_End.DTO.AdminDTO;
import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.Response.LoginResponse;
import com.example.Back_End.Services.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/admins") // Define the mapping for admin-related endpoints
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Get all admins
    @GetMapping("/getAll")
    public ResponseEntity<List<AdminDTO>> getAllAdmins() {
        List<AdminDTO> admins = adminService.getAllAdmins();
        if (admins.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 if no admins found
        }
        return ResponseEntity.ok(admins); // Return 200 with the list of admins
    }

    // Get admin by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<AdminDTO> getAdminById(@PathVariable int id) {
        Optional<AdminDTO> adminDTO = adminService.getAdminById(id);
        return adminDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build()); // Return 404 if not found
    }

    // Create a new admin
    @PostMapping("/create")
    public ResponseEntity<?> createAdmin(@Valid @RequestBody AdminDTO adminDTO) {
        try {
            String adminId = adminService.createAdmin(adminDTO);
            return ResponseEntity.ok().body("Admin created successfully with ID: " + adminId); // Return 200 if successful
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating admin: " + e.getMessage()); // Return 400 if bad request
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            LoginResponse loginResponse = adminService.loginAdmin(loginDTO);

            // Ensure adminId is included in the response
            Map<String, Object> response = new HashMap<>();
            response.put("message", loginResponse.getMessage());
            response.put("adminId", loginResponse.getId()); // Add this line

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error logging in");
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    // Update an existing admin
    @PutMapping("/update/{id}")
    public ResponseEntity<AdminDTO> updateAdmin(@PathVariable int id,@Valid @RequestBody AdminDTO adminDTO) {
        Optional<AdminDTO> updatedAdmin = adminService.updateAdmin(id, adminDTO);
        return updatedAdmin.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build()); // Return 404 if not found
    }

    // Delete an admin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable int id) {
        if (adminService.deleteAdmin(id)) {
            return ResponseEntity.noContent().build(); // Return 204 if deleted
        }
        return ResponseEntity.notFound().build(); // Return 404 if not found
    }
}

