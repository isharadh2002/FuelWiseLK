package com.example.Back_End.DTO;

import com.example.Back_End.Entity.Admin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class AdminDTO {

    private Long adminID;

    @NotNull(message = "Admin name cannot be null")  // Validation for non-null adminName
    private String adminName;

    @NotNull(message = "Email cannot be null")  // Validation for non-null email
    @Email(message = "Email should be valid")  // Validation for valid email format
    private String email;

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
                .map(AdminDTO::convertToDTO)
                .collect(Collectors.toList());
    }

    // Convert AdminDTO to Admin entity
    public static Admin convertToEntity(AdminDTO adminDTO) {
        Admin admin = new Admin();
        admin.setAdminID(adminDTO.getAdminID());
        admin.setAdminName(adminDTO.getAdminName());
        admin.setEmail(adminDTO.getEmail());
        return admin;
    }
}
