package com.example.Back_End.Services;

import com.example.Back_End.DTO.AdminDTO;

import java.util.List;
import java.util.Optional;

public interface AdminService {

    // Get all admins
    List<AdminDTO> getAllAdmins();

    // Get admin by ID
    Optional<AdminDTO> getAdminById(Long id);

    // Create a new admin
    AdminDTO createAdmin(AdminDTO adminDTO);

    // Update an existing admin
    Optional<AdminDTO> updateAdmin(Long id, AdminDTO adminDTO);

    // Delete an admin
    boolean deleteAdmin(Long id);
}
