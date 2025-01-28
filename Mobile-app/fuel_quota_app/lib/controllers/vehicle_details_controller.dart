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
  Future<bool> updateFuelQuota(String vehicleId, double fuelUsed) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/FuelQuota/updateFuelQuota/$vehicleId?fuelUsedOrAdded=$fuelUsed&fuelType=Petrol'),
        headers: {'Content-Type': 'application/json'},
      );

      return response.statusCode == 200;
    } catch (e) {
      print("Error updating fuel quota: $e");
      return false;
    }
  }
}
