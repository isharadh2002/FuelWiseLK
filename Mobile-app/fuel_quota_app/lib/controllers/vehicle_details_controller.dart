import 'dart:convert';
import 'package:http/http.dart' as http;

const String baseUrl = 'http://10.0.2.2:8080/api/v1/vehicles';

class VehicleDetailsController {
  // Fetch vehicle details by vehicle ID
  Future<Map<String, dynamic>?> fetchVehicleDetails(String vehicleId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/$vehicleId'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body) as Map<String, dynamic>;
      } else {
        return null;
      }
    } catch (e) {
      print("Error fetching vehicle details: $e");
      return null;
    }
  }

  Future<bool> updateFuelQuota(String vehicleId, double newFuelQuota) async {
    const double maxFuelQuota = 50.0;

    try {
      // Ensure the new fuel quota doesn't exceed the maximum limit (50L)
      if (newFuelQuota > maxFuelQuota) {
        print("New fuel quota exceeds maximum limit.");
        return false;
      }

      // API expects JSON in the body, so we send it correctly
      final response = await http.put(
        Uri.parse('$baseUrl/update-fuel-quota/$vehicleId'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(newFuelQuota), // Sending newFuelQuota as a JSON body
      );

      if (response.statusCode == 200) {
        print("Fuel quota updated successfully.");
        return true;
      } else {
        print("Failed to update fuel quota: ${response.body}");
        return false;
      }
    } catch (e) {
      print("Error updating fuel quota: $e");
      return false;
    }
  }
}
