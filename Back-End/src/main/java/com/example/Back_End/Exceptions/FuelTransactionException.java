
    package com.example.Back_End.Exceptions;

public class FuelTransactionException extends RuntimeException {

    public FuelTransactionException(String message) {
        super(message);
    }

    public FuelTransactionException(String message, Throwable cause) {
        super(message, cause);
    }
}

