package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.AdminDTO;
import com.example.Back_End.Entity.Admin;
import com.example.Back_End.Exceptions.AdminException;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Get all admins
    @Override
    public List<AdminDTO> getAllAdmins() {
        List<Admin> admins = adminRepository.findAll();
        return admins.stream().map(admin -> {
            AdminDTO adminDTO = new AdminDTO();
            adminDTO.setAdminID(admin.getAdminID());
            adminDTO.setAdminName(admin.getAdminName());
            adminDTO.setEmail(admin.getEmail());
            return adminDTO;
        }).collect(Collectors.toList());
    }

    // Get admin by ID
    @Override
    public Optional<AdminDTO> getAdminById(Long id) {
        Optional<Admin> admin = adminRepository.findById(id);
        return admin.map(a -> {
            AdminDTO adminDTO = new AdminDTO();
            adminDTO.setAdminID(a.getAdminID());
            adminDTO.setAdminName(a.getAdminName());
            adminDTO.setEmail(a.getEmail());
            return adminDTO;
        });
    }

    // Create a new admin
    @Override
    public AdminDTO createAdmin(AdminDTO adminDTO) {
        Optional<Admin> existingAdmin = adminRepository.findByEmail(adminDTO.getEmail());
        if (existingAdmin.isPresent()) {
            throw new AdminException("An admin with this email already exists.");
        }

        Admin admin = new Admin();
        admin.setAdminName(adminDTO.getAdminName());
        admin.setEmail(adminDTO.getEmail());
        admin.setPassword(passwordEncoder.encode(adminDTO.getPassword()));

        Admin savedAdmin = adminRepository.save(admin);

        AdminDTO savedAdminDTO = new AdminDTO();
        savedAdminDTO.setAdminID(savedAdmin.getAdminID());
        savedAdminDTO.setAdminName(savedAdmin.getAdminName());
        savedAdminDTO.setEmail(savedAdmin.getEmail());
        return savedAdminDTO;
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

            AdminDTO updatedAdminDTO = new AdminDTO();
            updatedAdminDTO.setAdminID(updatedAdmin.getAdminID());
            updatedAdminDTO.setAdminName(updatedAdmin.getAdminName());
            updatedAdminDTO.setEmail(updatedAdmin.getEmail());
            return Optional.of(updatedAdminDTO);
        }
        throw new AdminException("Admin with ID " + id + " not found.");
    }

    // Delete an admin
    @Override
    public boolean deleteAdmin(Long id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
            return true;
        }
        throw new AdminException("Admin with ID " + id + " not found.");
    }
}