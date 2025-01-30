package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.AdminDTO;
import com.example.Back_End.Entity.Admin;
import com.example.Back_End.Exceptions.AdminException;  // Custom exception for Admin operations
import com.example.Back_End.Repository.AdminRepository;
import com.example.Back_End.Services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceIMPL implements AdminService {

    @Autowired
    private AdminRepository adminRepository;


    // Get all admins
    @Override
    public List<AdminDTO> getAllAdmins() {
        List<Admin> admins = adminRepository.findAll();
        return AdminDTO.convertToDTOs(admins);  // Assuming AdminDTO has a method for converting List<Admin> to List<AdminDTO>
    }

    // Get admin by ID
    @Override
    public Optional<AdminDTO> getAdminById(Long id) {
        Optional<Admin> admin = adminRepository.findById(id);
        return admin.map(AdminDTO::convertToDTO);
    }

    // Create a new admin
    @Override
    public AdminDTO createAdmin(AdminDTO adminDTO) {
        // Check for existing email (optional check for uniqueness before saving)
        Optional<Admin> existingAdmin = adminRepository.findByEmail(adminDTO.getEmail());
        if (existingAdmin.isPresent()) {
            throw new AdminException("An admin with this email already exists.");
        }

        Admin admin = AdminDTO.convertToEntity(adminDTO);  // Convert DTO to Entity
        Admin savedAdmin = adminRepository.save(admin);  // Save to database
        return AdminDTO.convertToDTO(savedAdmin);  // Convert Entity back to DTO and return
    }

    // Update an existing admin
   @Override
    public Optional<AdminDTO> updateAdmin(Long id, AdminDTO adminDTO) {
        Optional<Admin> existingAdminOptional = adminRepository.findById(id);
        if (existingAdminOptional.isPresent()) {
            Admin existingAdmin = existingAdminOptional.get();

            if (adminDTO.getAdminName() != null) {
                existingAdmin.setAdminName(adminDTO.getAdminName());
            }
            if (adminDTO.getEmail() != null) {
                existingAdmin.setEmail(adminDTO.getEmail());
            }

            Admin updatedAdmin = adminRepository.save(existingAdmin);
            return Optional.of(AdminDTO.convertToDTO(updatedAdmin));
        }
        throw new AdminException("Admin with ID " + id + " not found.");
    }

    // Delete an admin
    @Override
    public boolean deleteAdmin(Long id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);  // Delete by ID
            return true;
        }
        throw new AdminException("Admin with ID " + id + " not found.");
    }
}
