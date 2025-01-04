import 'dart:convert';
import 'package:http/http.dart' as http;

class VehicleOwnerService {
  static const String baseUrl = 'http://localhost:8080/api/v1/login';

  // Save VehicleOwner
  Future<String> saveVehicleOwner(Map<String, dynamic> vehicleOwnerData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/save'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode(vehicleOwnerData),
    );

    if (response.statusCode == 200) {
      return response.body;
    } else {
      throw Exception('Failed to save vehicle owner');
    }
  }

  // Login VehicleOwner
  Future<Map<String, dynamic>> loginVehicleOwner(Map<String, dynamic> loginData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode(loginData),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Login failed');
    }
  }
}
