import 'dart:convert';
import 'package:http/http.dart' as http;

class SmsService {
  static Future<void> sendSMS({
    required String phoneNumber,
    required String message,
  }) async {
    const String apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Fake API

    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'phoneNumber': phoneNumber,
        'message': message,
      }),
    );

    if (response.statusCode == 201) {
      print('SMS sent successfully');
    } else {
      print('Failed to send SMS');
    }
  }
}
