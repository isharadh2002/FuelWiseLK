package com.example.Back_End.Exceptions;

public class UserException extends Exception {

    public UserException(String s) {

        super(s);
    }

    public UserException(String message, Throwable cause) {
        super(message, cause);
    }
}
