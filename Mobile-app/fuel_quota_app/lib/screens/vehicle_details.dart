import 'package:flutter/material.dart';

// Mock SMS Service
class SmsService {
  static void sendSMS({required String phoneNumber, required String message}) {
    // Simulate sending SMS
    print('SMS sent to $phoneNumber: $message');
  }
}

class VehicleDetails extends StatefulWidget {
  final String vehicleId;

  const VehicleDetails({super.key, required this.vehicleId});

  @override
  _VehicleDetailsState createState() => _VehicleDetailsState();
}

class _VehicleDetailsState extends State<VehicleDetails> {
  final TextEditingController fuelAmountController = TextEditingController();

  final String ownerName = "John Doe";
  final String vehicleName = "Toyota Prius";
  final String vehicleNumber = "ABC-1234";
  double totalFuelQuota = 50.0;
  double fuelQuotaLeft = 50.0;

  void submitFuelAmount() {
    final amountText = fuelAmountController.text;
    final double? amount = double.tryParse(amountText);

    if (amount != null && amount > 0 && amount <= fuelQuotaLeft) {
      setState(() {
        fuelQuotaLeft -= amount;
      });

      SmsService.sendSMS(
        phoneNumber: '1234567890',
        message:
        'Fuel Pumped: $amount Litres. Thank you for using our service.',
      );

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('SMS Sent Successfully!')),
      );

      fuelAmountController.clear();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Invalid amount or exceeds quota left!')),
      );
    }
  }

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
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              children: [
                const SizedBox(height: 50),

                const Text(
                  "Total Quota",
                  style: TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                Text(
                  "${totalFuelQuota.toStringAsFixed(2)} L",
                  style: const TextStyle(
                    fontSize: 60,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                Text(
                  "Quota Left: ${fuelQuotaLeft.toStringAsFixed(2)} L",
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w500,
                    color: Colors.black87,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                Text(
                  "Vehicle Number: $vehicleNumber",
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w400,
                    color: Colors.black54,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                Text(
                  "Vehicle ID: ${widget.vehicleId}",
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w400,
                    color: Colors.black54,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                Text(
                  "Owner: $ownerName",
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w400,
                    color: Colors.black54,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                Text(
                  "Vehicle: $vehicleName",
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w400,
                    color: Colors.black54,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
            Column(
              children: [
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
                  onPressed: submitFuelAmount,
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
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
