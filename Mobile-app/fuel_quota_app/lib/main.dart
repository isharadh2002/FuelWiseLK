import 'package:flutter/material.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(FuelQuotaApp());
}

class FuelQuotaApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fuel Quota App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginScreen(),
    );
  }
}
