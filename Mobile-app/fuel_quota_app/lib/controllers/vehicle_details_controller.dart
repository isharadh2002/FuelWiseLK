import 'dart:convert';
import 'package:http/http.dart' as http;

const String baseUrl = 'http://10.0.2.2:8080/api/v1/FuelQuota';

class VehicleDetailsController {
  // Fetch vehicle details by vehicle ID
  Future<Map<String, dynamic>?> fetchVehicleDetails(String vehicleId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/getRemainingQuota/$vehicleId'),
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

  // Update fuel quota for a vehicle
  Future<bool> updateFuelQuota(String vehicleId, double newFuelQuota) async {
    try {
      final Uri uri = Uri.parse('$baseUrl/FuelQuota/updateFuelQuota/$vehicleId')
          .replace(queryParameters: {
        'fuelUsedOrAdded': newFuelQuota.toString(),
        'fuelType': 'Petrol',
      });

      final response = await http.put(
        uri,
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 500) {
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
