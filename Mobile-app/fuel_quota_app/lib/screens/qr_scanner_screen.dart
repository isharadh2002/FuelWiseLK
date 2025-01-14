import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({super.key});

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  String result = "Scan a QR code";

  // Create a controller for MobileScanner
  final MobileScannerController cameraController = MobileScannerController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('QR Code Scanner'),
      ),
      body: Column(
        children: [
          // QR Scanner widget
          Expanded(
            child: MobileScanner(
              controller: cameraController,
              onDetect: (BarcodeCapture barcodeCapture) {
                // Access the scanned barcode
                final barcode = barcodeCapture.barcodes.first;
                setState(() {
                  result = barcode.rawValue ?? "Unknown code";
                });
              },
            ),
          ),
          // Display the result
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Scan Result: $result',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }
}
