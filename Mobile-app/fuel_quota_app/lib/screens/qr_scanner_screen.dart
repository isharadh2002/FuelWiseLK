import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:fuel_quota_app/controllers/vehicle_details_controller.dart';
import 'package:fuel_quota_app/screens/fuel_quota.dart';

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({super.key});

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  String result = "Scan a QR code";
  final MobileScannerController cameraController = MobileScannerController();
  final VehicleDetailsController vehicleDetailsController = VehicleDetailsController();

  bool isProcessing = false; // To prevent multiple API calls

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('QR Code Scanner'),
        actions: [
          IconButton(
            icon: Icon(cameraController.torchEnabled ? Icons.flash_on : Icons.flash_off),
            onPressed: () => cameraController.toggleTorch(),
          ),
        ],
      ),
      body: Stack(
        children: [
          MobileScanner(
            controller: cameraController,
            onDetect: (BarcodeCapture barcodeCapture) async {
              if (isProcessing) return;
              setState(() => isProcessing = true);

              final barcode = barcodeCapture.barcodes.first;
              if (barcode.rawValue != null && barcode.rawValue!.isNotEmpty) {
                final vehicleId = _parseVehicleId(barcode.rawValue!);

                if (vehicleId != null) {
                  final vehicleDetails = await vehicleDetailsController.fetchVehicleDetails(vehicleId);

                  if (vehicleDetails != null) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => FuelQuotaPage(
                          vehicleId: vehicleId,
                          ownerName: vehicleDetails['ownerName'] ?? 'Unknown',
                          registrationNumber: vehicleDetails['registrationNumber'] ?? 'N/A',
                          vehicleFuelQuota: (vehicleDetails['vehicleFuelQuota'] as num?)?.toDouble() ?? 0.0,
                        ),
                      ),
                    );
                  } else {
                    _showSnackBar('Vehicle details not found!');
                  }
                } else {
                  _showSnackBar('Invalid QR Code format!');
                }
              } else {
                _showSnackBar('No QR Code detected!');
              }

              setState(() => isProcessing = false);
            },
          ),
          if (isProcessing)
            const Center(
              child: CircularProgressIndicator(),
            ),
        ],
      ),
    );
  }

  String? _parseVehicleId(String rawValue) {
    try {
      final parts = rawValue.split(',');
      for (var part in parts) {
        if (part.trim().startsWith("Vehicle ID:")) {
          return part.split(':')[1].trim();
        }
      }
    } catch (e) {
      debugPrint("Error parsing QR code: $e");
    }
    return null;
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }
}
