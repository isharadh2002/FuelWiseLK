package com.example.Back_End.Services;


import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.DTO.UserDTO;
import com.example.Back_End.Exceptions.UserException;
import com.example.Back_End.Response.LoginResponse;

public interface UserService {

    String addUser(UserDTO userDTO) throws UserException;
    LoginResponse loginUser(LoginDTO loginDTO);

    String addMobileUser(UserDTO userDTO) throws UserException;
    LoginResponse loginMobileUser(LoginDTO loginDTO);

    String updateUser(int userId, UserDTO userDTO) throws UserException;
    String updateMobileUser(int userId, UserDTO userDTO) throws UserException;

    UserDTO getUser(int userId) throws UserException;
    UserDTO getMobileUser(int userId) throws UserException;
}
