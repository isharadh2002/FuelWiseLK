import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../screens/dashboard.dart';
import '../screens/login_screen.dart';

class LoginController {
  static const String baseUrl = 'http://10.0.2.2:8080/api/v1/VehicleOwner';

  Future<void> login(BuildContext context, String email, String password) async {
    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in all fields')),
      );
      return;
    }

    final Map<String, String> loginData = {
      'email': email,
      'password': password,
    };

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(loginData),
      );

      if (response.statusCode == 200) {
        final responseBody = jsonDecode(response.body);

        if (responseBody['status'] == true) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Login successful')),
          );

          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => Dashboard()),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(responseBody['message'] ?? 'Invalid email or password')),
          );
        }

      } else {
        // Handle error (invalid login)
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Invalid email or password')),
        );
      }
    } catch (e) {
      // Handle errors (e.g., network error)
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Login failed, try again later')),
      );
    }
  }


  Future<void> register(
      BuildContext context, String name, String email, String password, String phone) async {
    if (name.isEmpty || email.isEmpty || password.isEmpty || phone.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in all fields')),
      );
      return;
    }

    final Map<String, String> registrationData = {
      'ownerName': name,
      'ownerEmail': email,
      'ownerPassword': password,
      'ownerPhone': phone,
    };

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/save'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(registrationData),
      );

      if (response.statusCode == 200) {
        final responseBody = jsonDecode(response.body);

        if (responseBody['message'] == 'Vehicle Owner added successfully!') {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Registration successful')),
          );

          // Navigate to the login screen after successful registration
          Navigator.pop(context);

          // Navigate to the login screen after successful registration
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => LoginScreen()), // Replace with your login page
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Registration failed')),
          );
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Registration failed')),
        );
      }
    } catch (e) {
      // Handle errors (e.g., network error)
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Registration failed, try again later')),
      );
    }
  }
}
