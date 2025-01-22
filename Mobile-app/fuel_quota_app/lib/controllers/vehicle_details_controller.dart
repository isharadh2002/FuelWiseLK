import 'dart:convert';
import 'package:http/http.dart' as http;

// Base URL of the Spring Boot backend API
const String baseUrl = 'http://10.0.2.2:8080/api/v1/VehicleOwner';

class VehicleDetailsController {
  // Fetch vehicle details by vehicle ID
  Future<Map<String, dynamic>?> fetchVehicleDetails(String vehicleId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/$vehicleId'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body); // Return vehicle details as a map
      } else {
        return null; // Vehicle not found or error occurred
      }
    } catch (e) {
      print("Error fetching vehicle details: $e");
      return null;
    }
  }

  // Update fuel quota after fuel is pumped
  Future<bool> updateFuelQuota(String vehicleId, double fuelUsed) async {
    final Map<String, dynamic> fuelUpdateRequest = {
      'fuelUsed': fuelUsed,
    };

    try {
      final response = await http.put(
        Uri.parse('$baseUrl/$vehicleId/fuel'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(fuelUpdateRequest),
      );

      if (response.statusCode == 200) {
        return true; // Fuel quota updated successfully
      } else {
        return false; // Failed to update fuel quota
      }
    } catch (e) {
      print("Error updating fuel quota: $e");
      return false;
    }
  }
}
