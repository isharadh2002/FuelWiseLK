import 'package:flutter/material.dart';
import 'package:fuel_quota_app/screens/vehicle_details.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class QRScanner extends StatefulWidget {
  const QRScanner({super.key});

  @override
  _QRScannerState createState() => _QRScannerState();
}

class _QRScannerState extends State<QRScanner> {
  MobileScannerController? controller;

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }

  void _onScan(BarcodeCapture capture) {
    final vehicleId = capture.barcodes.first.rawValue;

    if (vehicleId != null) {
      controller?.stop();

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => VehicleDetails(vehicleId: vehicleId),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Scan QR Code'),
        centerTitle: true,
      ),
      body: MobileScanner(
        controller: controller ??= MobileScannerController(),
        onDetect: _onScan,
      ),
    );
  }
}
