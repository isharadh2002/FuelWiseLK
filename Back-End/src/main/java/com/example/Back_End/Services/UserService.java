package com.example.Back_End.Services;


import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.DTO.UserDTO;
import com.example.Back_End.Response.LoginResponse;

public interface UserService {

    String addUser(UserDTO userDTO);
    LoginResponse loginUser(LoginDTO loginDTO);

    String addMobileUser(UserDTO userDTO);
    LoginResponse loginMobileUser(LoginDTO loginDTO);

    String updateUser(int userId, UserDTO userDTO);
    String updateMobileUser(int userId, UserDTO userDTO);

    UserDTO getUser(int userId);
    UserDTO getMobileUser(int userId);
}
