import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ProfileController {
  static const String baseUrl = 'http://10.0.2.2:8080/api/v1/User';

  Future<Map<String, dynamic>> fetchProfile(String userId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/getMobileUser/$userId'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = jsonDecode(response.body);
        // Only return the necessary fields
        return {
          'name': data['userName'],
          'email': data['email'],
          'phone': data['phone'],
          'password': '', // Leave it empty initially
        };
      } else {
        throw Exception('Failed to fetch profile');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  Future<void> updateProfile(BuildContext context, String userId, Map<String, dynamic> data) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/updateMobileUser/$userId'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'userName': data['name'],
          'email': data['email'],
          'phone': data['phone'],
          'password': data['password'], // Update password if needed
        }),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Profile updated successfully')),
        );
      } else {
        throw Exception('Failed to update profile');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }
}
