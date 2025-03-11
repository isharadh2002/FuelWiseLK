import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:fuel_quota_app/app_config.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../screens/dashboard.dart';
import '../screens/login_screen.dart';

Future<void> storeUserId(String userId) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setString('userId', userId);
}

class LoginController {
  static const String baseUrl = '$backendURL/api/v1/User';

  //Retrieve FuelStationID after login
  Future<void> fetchAndStoreStationID(String userId) async {
    const String fuelStationBaseUrl = '$backendURL/api/v1/FuelStation';

    try {
      final response = await http.get(
        Uri.parse('$fuelStationBaseUrl/getStationID/$userId'),
      );

      if (response.statusCode == 200) {
        final stationID = response.body; // Assuming it returns just the integer ID as response

        SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setString('stationID', stationID);

        print('Station ID stored successfully: $stationID');
      } else {
        print('Failed to fetch station ID');
      }
    } catch (e) {
      print('Error fetching station ID: $e');
    }
  }


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
        Uri.parse('$baseUrl/loginMobileUser'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(loginData),
      );

      print('Response Status: ${response.statusCode}');
      print('Response Body: ${response.body}');

      if (response.statusCode == 200) {
        final responseBody = jsonDecode(response.body);

        print('Decoded Response: $responseBody');

        if (responseBody['status'] == true) {
          // Use 'id' from response instead of 'userId'
          final String userId = responseBody['id'].toString();

          // Store the userId in SharedPreferences
          SharedPreferences prefs = await SharedPreferences.getInstance();
          await prefs.setString('userId', userId);

          // Retrieve and store stationID
          await fetchAndStoreStationID(userId);

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
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Invalid email or password')),
        );
      }
    } catch (e) {
      print('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Login failed, try again later')),
      );
    }
  }

  Future<void> register(
      BuildContext context,
      String userName,
      String email,
      String password,
      String phone,
      String stationName,
      String contact,
      String location,
      ) async {

    // Check if required fields are filled
    if (userName.isEmpty || email.isEmpty || password.isEmpty || phone.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in all required fields')),
      );
      return;
    }

    final Map<String, String> registrationData = {
      'userName': userName,
      'email': email,
      'password': password,
      'phone': phone,
      'role': "fuel_station",
      'stationName': stationName,
      'contact': contact,
      'location': location,
    };

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/RegMobileUser'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(registrationData),
      );

      print('Response Status: ${response.statusCode}');
      print('Response Body: ${response.body}');

      if (response.statusCode == 200) {
        final responseBody = response.body;

        if (responseBody.contains('Fuel Station Owner registered successfully')) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Registration successful')),
          );

          // After successful registration, navigate to login screen
          Navigator.pop(context);

          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => LoginScreen()),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(responseBody ?? 'Registration failed')),
          );
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Registration failed')),
        );
      }
    } catch (e) {
      print('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Registration failed, try again later')),
      );
    }
  }


}
