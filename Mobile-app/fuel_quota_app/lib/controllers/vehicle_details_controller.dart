import 'dart:convert';
import 'package:http/http.dart' as http;

const String baseUrl = 'http://10.0.2.2:8080/api/v1';

class VehicleDetailsController {
  // Fetch vehicle details by vehicle ID
  Future<Map<String, dynamic>?> fetchVehicleDetails(String vehicleId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/vehicles/$vehicleId'),
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

  // Update fuel quota after fuel is pumped
  Future<bool> updateFuelQuota(String vehicleId, double newFuelQuota) async {
    const double maxFuelQuota = 50.0; // Maximum fuel quota limit

    try {
      // Fetch current vehicle details to get the remaining fuel quota
      final vehicleDetails = await fetchVehicleDetails(vehicleId);
      if (vehicleDetails == null) {
        return false; // Vehicle not found
      }

      // Ensure the new fuel quota doesn't exceed the maximum limit (50L)
      if (newFuelQuota > maxFuelQuota) {
        return false; // New quota exceeds max limit
      }

      // If the new quota is valid, update it
      final response = await http.put(
        Uri.parse('$baseUrl/FuelQuota/updateFuelQuota/$vehicleId?fuelUsedOrAdded=$newFuelQuota&fuelType=Petrol'),
        headers: {'Content-Type': 'application/json'},
      );

      return true;
    } catch (e) {
      print("Error updating fuel quota: $e");
      return false;
    }
  }
}
