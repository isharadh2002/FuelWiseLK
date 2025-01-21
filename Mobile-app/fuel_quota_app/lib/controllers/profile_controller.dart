import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ProfileController {
  static const String baseUrl = 'http://10.0.2.2:8080/api/v1/VehicleOwner';

  Future<Map<String, dynamic>> fetchProfile(String userId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/profile/$userId'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
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
        Uri.parse('$baseUrl/profile/$userId'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
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
