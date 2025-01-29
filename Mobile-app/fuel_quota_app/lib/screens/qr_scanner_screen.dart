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
  final MobileScannerController cameraController = MobileScannerController();
  final VehicleDetailsController vehicleDetailsController = VehicleDetailsController();
  bool isProcessing = false; // Prevent multiple API calls

  @override
  void initState() {
    super.initState();
    cameraController.start(); // Start the camera initially
  }

  @override
  void dispose() {
    cameraController.dispose(); // Properly dispose of camera when leaving screen
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        cameraController.stop(); // Stop camera before leaving
        return true;
      },
      child: Scaffold(
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
                      cameraController.stop(); // Stop camera before navigation

                      await Navigator.push(
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

                      // Restart camera when coming back
                      setState(() {
                        isProcessing = false;
                      });
                      cameraController.start();
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
