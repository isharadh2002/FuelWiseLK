import 'package:flutter/material.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'package:fuel_quota_app/controllers/vehicle_details_controller.dart';

import 'dashboard.dart';

class FuelQuotaPage extends StatefulWidget {
  final String vehicleId;
  final String ownerName;
  final String registrationNumber;
  final double vehicleFuelQuota;

  const FuelQuotaPage({
    super.key,
    required this.vehicleId,
    required this.ownerName,
    required this.registrationNumber,
    required this.vehicleFuelQuota,
  });

  @override
  _FuelQuotaPageState createState() => _FuelQuotaPageState();
}

class _FuelQuotaPageState extends State<FuelQuotaPage> {
  TextEditingController _fuelController = TextEditingController();
  late double _remainingFuelQuota;
  double _pumpedFuel = 0.0;
  final VehicleDetailsController _vehicleDetailsController = VehicleDetailsController();

  @override
  void initState() {
    super.initState();
    _remainingFuelQuota = 50.0 - widget.vehicleFuelQuota;
    print(widget.vehicleFuelQuota);
    print(_remainingFuelQuota);
  }

  void _updateFuelQuota() async {
    double enteredFuel = double.tryParse(_fuelController.text) ?? 0.0;
    double currentFuelQuota = widget.vehicleFuelQuota;

    // Add pumped fuel to current quota and ensure it doesn't exceed max limit
    double newFuelQuota = currentFuelQuota + enteredFuel;

    // Clamp the new fuel quota to ensure it doesn't exceed 50L or go below 0L
    newFuelQuota = newFuelQuota.clamp(0.0, 50.0);

    setState(() {
      _remainingFuelQuota = 50.0 - newFuelQuota; // Update remaining fuel
    });

    _fuelController.clear();

    // Update the vehicle's fuel quota using the API
    bool success = await _vehicleDetailsController.updateFuelQuota(widget.vehicleId, newFuelQuota);
    if (success) {
      _showSnackBar('Fuel quota updated successfully!');
    } else {
      _showSnackBar('Failed to update fuel quota. Please check the remaining quota.');
    }
  }




  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  @override
  Widget build(BuildContext context) {
    double percentageRemaining = (_remainingFuelQuota / 50.0);
    final primaryGreen = Color(0xFF2E7D32);

    return Scaffold(
      backgroundColor: primaryGreen,
      appBar: AppBar(
        title: Text(
          "Vehicle Owner Information",
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        actions: [
          IconButton(
            icon: Icon(Icons.share, color: Colors.white),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          SizedBox(height: 20),
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(30),
                  topRight: Radius.circular(30),
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    // Owner Information
                    Text(
                      widget.ownerName,
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: primaryGreen,
                      ),
                    ),

                    Divider(thickness: 1, height: 24, color: Colors.grey[300]!),

                    Text(
                      widget.registrationNumber,
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: primaryGreen,
                      ),
                    ),

                    SizedBox(height: 24),

                    // Circular Progress Indicator
                    CircularPercentIndicator(
                      radius: 100.0,
                      lineWidth: 12.0,
                      percent: percentageRemaining,
                      center: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "${_remainingFuelQuota.toStringAsFixed(1)} L",
                            style: TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                              color: primaryGreen,
                            ),
                          ),
                          Text(
                            "Remaining",
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey[600]!,
                            ),
                          ),
                        ],
                      ),
                      progressColor: primaryGreen,
                      backgroundColor: Color(0xFFF1F8E9),
                      circularStrokeCap: CircularStrokeCap.round,
                    ),

                    SizedBox(height: 24),

                    // Fuel Input
                    TextField(
                      controller: _fuelController,
                      keyboardType: TextInputType.number,
                      decoration: InputDecoration(
                        labelText: 'Enter Pumped Fuel (L)',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12.0),
                        ),
                        filled: true,
                        fillColor: Color(0xFFFAFAFA),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: primaryGreen),
                          borderRadius: BorderRadius.circular(12.0),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey[300]!),
                          borderRadius: BorderRadius.circular(12.0),
                        ),
                      ),
                    ),
                    SizedBox(height: 16),

                    // Update Button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: _updateFuelQuota,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: primaryGreen,
                          padding: EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          elevation: 0,
                        ),
                        child: Text(
                          'Update Fuel Quota',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
