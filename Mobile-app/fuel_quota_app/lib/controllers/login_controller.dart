import 'package:flutter/material.dart';

class LoginController {
  void login(BuildContext context, String email, String password) {
    // Add actual login logic here
    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in all fields')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Login functionality not implemented yet')),
      );
    }
  }
}
