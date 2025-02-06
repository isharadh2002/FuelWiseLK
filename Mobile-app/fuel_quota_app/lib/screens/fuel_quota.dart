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
  TextEditingController fuelController = TextEditingController();
  late double currentFuelQuota;
  final VehicleDetailsController vehicleDetailsController = VehicleDetailsController();
  static const double maxFuelQuota = 50.0;

  @override
  void initState() {
    super.initState();
    currentFuelQuota = widget.vehicleFuelQuota;
  }

  void _updateFuelQuota() async {
    double enteredFuel = double.tryParse(fuelController.text) ?? 0.0;

    if (enteredFuel <= 0) {
      _showSnackBar('Enter a valid fuel amount.');
      return;
    }

    if (enteredFuel > currentFuelQuota) {
      _showSnackBar('Exceeds maximum quota. Adjust your input.');
      return;
    }

    // Update UI optimistically
    setState(() {
      currentFuelQuota = currentFuelQuota - enteredFuel;
    });

    fuelController.clear();

    // Call API to update fuel quota
    bool success = await vehicleDetailsController.updateFuelQuota(widget.vehicleId, enteredFuel);

    if (success) {
      _showSnackBar('Fuel quota updated successfully!');
    } else {
      _showSnackBar('Failed to update fuel quota. Please try again.');
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Ensure percentage is between 0.0 and 1.0
    double percentageRemaining = (currentFuelQuota / maxFuelQuota).clamp(0.0, 1.0);
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
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
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
                            "${currentFuelQuota.toStringAsFixed(1)} L",
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
                      controller: fuelController,
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

                    SizedBox(height: 16),

                    // Dashboard Button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => Dashboard()),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: primaryGreen,
                          padding: EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          elevation: 0,
                        ),
                        child: Text(
                          'Go to Dashboard',
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