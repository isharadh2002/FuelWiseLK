import 'package:flutter/material.dart';
import '../services/sms_service.dart';

class VehicleDetails extends StatefulWidget {
  final String vehicleId;

  const VehicleDetails({super.key, required this.vehicleId});

  @override
  State<VehicleDetails> createState() => _VehicleDetailsState();
}

class _VehicleDetailsState extends State<VehicleDetails> {
  final TextEditingController fuelAmountController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vehicle Details'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Vehicle ID: ${widget.vehicleId}',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            const Text(
              'Available Fuel Quota: 30 Litres',
              style: TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: fuelAmountController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'Pumped Fuel Amount (Litres)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                final amount = fuelAmountController.text;
                if (amount.isNotEmpty) {
                  SmsService.sendSMS(
                    phoneNumber: '1234567890', // Replace with actual vehicle owner's number
                    message:
                    'Fuel Pumped: $amount Litres. Thank you for using our service.',
                  );
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('SMS Sent Successfully!')),
                  );
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                minimumSize: const Size(double.infinity, 48),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text(
                  'Submit',
                  style: TextStyle(
                    color: Colors.white,
                  )
              ),
            ),
          ],
        ),
      ),
    );
  }
}
