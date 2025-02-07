import 'package:flutter/material.dart';
import '../controllers/vehicle_details_controller.dart';

class VehicleDetailsPage extends StatefulWidget {
  final String vehicleId;

  const VehicleDetailsPage({super.key, required this.vehicleId});

  @override
  _VehicleDetailsPageState createState() => _VehicleDetailsPageState();
}

class _VehicleDetailsPageState extends State<VehicleDetailsPage> {
  final TextEditingController fuelAmountController = TextEditingController();
  final VehicleDetailsController vehicleController = VehicleDetailsController();

  Map<String, dynamic>? vehicleDetails;
  double totalFuelQuota = 0.0;
  double fuelQuotaLeft = 0.0;

  @override
  void initState() {
    super.initState();
    _fetchVehicleDetails();
  }

  Future<void> _fetchVehicleDetails() async {
    vehicleDetails = await vehicleController.fetchVehicleDetails(widget.vehicleId);

    if (vehicleDetails != null) {
      setState(() {
        totalFuelQuota = vehicleDetails!['totalFuelQuota'];
        fuelQuotaLeft = vehicleDetails!['fuelQuotaLeft'];
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to fetch vehicle details')),
      );
    }
  }

  Future<void> _submitFuelAmount() async {
    final fuelAmount = double.tryParse(fuelAmountController.text);

    if (fuelAmount != null && fuelAmount > 0) {
      final success = await vehicleController.updateFuelQuota(widget.vehicleId, fuelAmount, 'Hardcoded-Petrol', "1");

      if (success) {
        setState(() {
          fuelQuotaLeft -= fuelAmount;
        });

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Fuel quota updated successfully!')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to update fuel quota')),
        );
      }
      fuelAmountController.clear();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Invalid fuel amount')),
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
            if (vehicleDetails != null) ...[
              const SizedBox(height: 50),
              Text(
                "Owner: ${vehicleDetails!['ownerName']}",
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w400,
                  color: Colors.black54,
                ),
              ),
              Text(
                "Vehicle: ${vehicleDetails!['vehicleName']}",
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w400,
                  color: Colors.black54,
                ),
              ),
              Text(
                "Vehicle ID: ${vehicleDetails!['vehicleId']}",
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w400,
                  color: Colors.black54,
                ),
              ),
              Text(
                "Vehicle Number: ${vehicleDetails!['vehicleNumber']}",
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w400,
                  color: Colors.black54,
                ),
              ),
              Text(
                "Total Quota: ${vehicleDetails!['totalFuelQuota']} L",
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w400,
                  color: Colors.black54,
                ),
              ),
              Text(
                "Quota Left: ${vehicleDetails!['fuelQuotaLeft']} L",
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w400,
                  color: Colors.black54,
                ),
              ),
              const SizedBox(height: 20),
            ],
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
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(color: Color(0xFF22C55F), width: 2.0),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _submitFuelAmount,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF22C55F),
                    minimumSize: const Size(double.infinity, 48),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text(
                    'Submit',
                    style: TextStyle(color: Colors.white),
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
