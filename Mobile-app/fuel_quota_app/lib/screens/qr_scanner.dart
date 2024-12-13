import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'vehicle_details.dart';

class QRScanner extends StatelessWidget {
  const QRScanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('QR Scanner'),
        centerTitle: true,
      ),
      body: MobileScanner(
        onDetect: (capture) {
          final List<Barcode> barcodes = capture.barcodes;
          for (final barcode in barcodes) {
            final String? data = barcode.rawValue;
            if (data != null) {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => VehicleDetails(vehicleId: data),
                ),
              );
              break;
            }
          }
        },
      ),
    );
  }
}
