package com.example.Back_End.DTO;

import com.example.Back_End.Entity.Admin;
import java.util.List;
import java.util.stream.Collectors;

public class AdminDTO {

    private Long adminID;
    private String adminName;
    private String email;

    // Getters and Setters

    // Convert single Admin entity to AdminDTO
    public static AdminDTO convertToDTO(Admin admin) {
        AdminDTO adminDTO = new AdminDTO();
        adminDTO.setAdminID(admin.getAdminID());
        adminDTO.setAdminName(admin.getAdminName());
        adminDTO.setEmail(admin.getEmail());
        return adminDTO;
    }

    // Convert a list of Admin entities to a list of AdminDTOs
    public static List<AdminDTO> convertToDTOs(List<Admin> admins) {
        return admins.stream()
                .map(AdminDTO::convertToDTO)  // Convert each Admin to AdminDTO
                .collect(Collectors.toList());  // Collect results into a List
    }

    // Convert AdminDTO to Admin entity
    public static Admin convertToEntity(AdminDTO adminDTO) {
        Admin admin = new Admin();
        admin.setAdminID(adminDTO.getAdminID());
        admin.setAdminName(adminDTO.getAdminName());
        admin.setEmail(adminDTO.getEmail());
        return admin;
    }

    // Getters and Setters
    public Long getAdminID() {
        return adminID;
    }

    public void setAdminID(Long adminID) {
        this.adminID = adminID;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
