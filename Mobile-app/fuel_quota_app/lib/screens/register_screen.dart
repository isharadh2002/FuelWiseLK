import 'package:flutter/material.dart';
import '../controllers/login_controller.dart';

class RegistrationScreen extends StatelessWidget {
  final TextEditingController userNameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController stationNameController = TextEditingController();
  final TextEditingController contactController = TextEditingController();
  final TextEditingController locationController = TextEditingController();

  RegistrationScreen({super.key});

  bool isValidEmail(String email) {
    String pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
    RegExp regex = RegExp(pattern);
    return regex.hasMatch(email);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(height: 50.0),
                // App logo
                Image.asset(
                  'assets/website_logo.png',
                  width: 150,
                  height: 150,
                ),
                const SizedBox(height: 10.0),

                // Title
                const Text(
                  'Register',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
                const SizedBox(height: 20.0),

                // UserName field
                _buildTextField(
                  controller: userNameController,
                  label: 'User Name',
                ),
                const SizedBox(height: 20.0),

                // Email field
                _buildTextField(
                  controller: emailController,
                  label: 'Email',
                  errorText: !isValidEmail(emailController.text) &&
                      emailController.text.isNotEmpty
                      ? 'Please enter a valid email address.'
                      : null,
                ),
                const SizedBox(height: 20.0),

                // Password field
                _buildTextField(
                  controller: passwordController,
                  label: 'Password',
                  obscureText: true,
                ),
                const SizedBox(height: 20.0),

                // Confirm Password field
                _buildTextField(
                  controller: confirmPasswordController,
                  label: 'Confirm Password',
                  obscureText: true,
                ),
                const SizedBox(height: 20.0),

                // Phone field
                _buildTextField(
                  controller: phoneController,
                  label: 'Phone Number',
                ),

                const SizedBox(height: 20.0),

                // Additional fields for Fuel Station
                _buildTextField(
                  controller: stationNameController,
                  label: 'Station Name',
                ),
                const SizedBox(height: 20.0),
                _buildTextField(
                  controller: contactController,
                  label: 'Contact',
                ),
                const SizedBox(height: 20.0),
                _buildTextField(
                  controller: locationController,
                  label: 'Location',
                ),
                const SizedBox(height: 20.0),

                // Register button
                ElevatedButton(
                  onPressed: () {
                    // Validate email format
                    if (!isValidEmail(emailController.text)) {
                      _showErrorDialog(context, 'Please enter a valid email address.');
                      return;
                    }

                    // Validate that password and confirm password match
                    if (passwordController.text != confirmPasswordController.text) {
                      _showErrorDialog(context, 'Confirm password does not match with password.');
                      return;
                    }

                    // Call LoginController register method
                    LoginController().register(
                      context,
                      userNameController.text,
                      emailController.text,
                      passwordController.text,
                      phoneController.text,
                      stationNameController.text,
                      contactController.text,
                      locationController.text,
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    elevation: 6,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    padding: EdgeInsets.zero,
                  ),
                  child: Ink(
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF22C55F), Color(0xFF14B8A5)],
                        begin: Alignment.centerLeft,
                        end: Alignment.centerRight,
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Container(
                      height: 48,
                      alignment: Alignment.center,
                      child: const Text(
                        'Register',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10.0),

                // Already have an account
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text(
                    'Already have an account? Login',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF22C55F),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    bool obscureText = false,
    String? errorText,
  }) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(
        labelText: label,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFF22C55F), width: 2.0),
        ),
        errorText: errorText,
      ),
    );
  }

  void _showErrorDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          title: const Text(
            'Error',
            style: TextStyle(
              color: Color(0xFF22C55F),
              fontWeight: FontWeight.bold,
            ),
          ),
          content: Text(
            message,
            style: const TextStyle(
              color: Colors.black,
              fontSize: 15,
            ),
          ),
          actions: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text(
                    'OK',
                    style: TextStyle(
                      color: Color(0xFF22C55F),
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}
