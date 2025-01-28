import 'package:flutter/material.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';

class FuelQuotaPage extends StatefulWidget {
  final String ownerName;
  final String ownerEmail;
  final String vehicleModel;
  final String vehicleNumber;
  final double totalQuota;
  final double initialRemainingQuota;

  const FuelQuotaPage({
    super.key,
    required this.ownerName,
    required this.ownerEmail,
    required this.vehicleModel,
    required this.vehicleNumber,
    required this.totalQuota,
    required this.initialRemainingQuota,
  });

  @override
  _FuelQuotaPageState createState() => _FuelQuotaPageState();
}

class _FuelQuotaPageState extends State<FuelQuotaPage> {
  TextEditingController _fuelController = TextEditingController();
  late double _remainingFuelQuota;
  double _pumpedFuel = 0.0;

  @override
  void initState() {
    super.initState();
    _remainingFuelQuota = widget.initialRemainingQuota;
  }

  void _updateFuelQuota() {
    setState(() {
      double enteredFuel = double.tryParse(_fuelController.text) ?? 0.0;
      _pumpedFuel = enteredFuel;
      _remainingFuelQuota = (_remainingFuelQuota - enteredFuel).clamp(0.0, widget.totalQuota);
      _fuelController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    double percentageRemaining = (_remainingFuelQuota / widget.totalQuota);
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
                    Text(
                      widget.ownerEmail,
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey[600]!,
                      ),
                    ),
                    Divider(thickness: 1, height: 24, color: Colors.grey[300]!),

                    Text(
                      '${widget.vehicleModel} - ${widget.vehicleNumber}',
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