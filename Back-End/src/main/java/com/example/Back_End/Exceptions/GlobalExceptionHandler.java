package com.example.Back_End.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(FuelStationException.class)
    public ResponseEntity<String> handleFuelStationException(FuelStationException ex) {
        // Return the exception message with a 404 status code
        return new ResponseEntity<>("FuelStationException occurred! : "+ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FuelQuotaException.class)
    public ResponseEntity<String> handleFuelStationException(FuelQuotaException ex) {
        // Return the exception message with a 404 status code
        return new ResponseEntity<>("FuelQuotaException occurred! : "+ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AdminException.class)
    public ResponseEntity<String> handleFuelStationException(AdminException ex) {
        // Return the exception message with a 404 status code
        return new ResponseEntity<>("AdminException occurred! : "+ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        // Handle all other exceptions with a 500 status code
        return new ResponseEntity<>("An unexpected error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
