package com.example.Back_End.Services;

import com.example.Back_End.DTO.AdminDTO;
import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.Response.LoginResponse;

import java.util.List;
import java.util.Optional;

public interface AdminService {

    // Get all admins
    List<AdminDTO> getAllAdmins();

    // Get admin by ID
    Optional<AdminDTO> getAdminById(int id);

    //Login an admin
    LoginResponse loginAdmin(LoginDTO loginDTO);

    // Create a new admin
    String createAdmin(AdminDTO adminDTO);

    // Update an existing admin
    Optional<AdminDTO> updateAdmin(int id, AdminDTO adminDTO);

    // Delete an admin
    boolean deleteAdmin(int id);
}
