import 'package:flutter/material.dart';
import '../controllers/profile_controller.dart';

class ProfileEditPage extends StatelessWidget {
  final String userId;
  final String name;
  final String email;
  final String phone;

  final TextEditingController nameController;
  final TextEditingController emailController;
  final TextEditingController phoneController;
  final TextEditingController passwordController = TextEditingController();

  ProfileEditPage({
    super.key,
    required this.userId,
    required this.name,
    required this.email,
    required this.phone,
  })  : nameController = TextEditingController(text: name),
        emailController = TextEditingController(text: email),
        phoneController = TextEditingController(text: phone);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Profile'),
        backgroundColor: const Color(0xFF22C55F),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            _buildTextField('Name', nameController),
            const SizedBox(height: 20),
            _buildTextField('Email', emailController),
            const SizedBox(height: 20),
            _buildTextField('Phone', phoneController),
            const SizedBox(height: 20),
            _buildTextField('Password', passwordController),
            const Spacer(),
            Center(  // Centering the button
              child: ElevatedButton(
                onPressed: () {
                  ProfileController().updateProfile(
                    context,
                    userId,
                    {
                      'name': nameController.text,
                      'email': emailController.text,
                      'phone': phoneController.text,
                      'password': passwordController.text,
                    },
                  );
                },
                style: ElevatedButton.styleFrom(
                  // Transparent background to use gradient
                  backgroundColor: Colors.transparent,
                  elevation: 6, // Shadow for the button
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12), // Match rounded corners
                  ),
                  padding: EdgeInsets.zero, // Remove default padding to fit Ink
                ),
                child: Ink(
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF22C55F), Color(0xFF14B8A5)], // Green to teal gradient
                      begin: Alignment.centerLeft,
                      end: Alignment.centerRight,
                    ),
                    borderRadius: BorderRadius.circular(12), // Rounded corners
                  ),
                  child: Container(
                    height: 48, // Button height
                    alignment: Alignment.center,
                    child: const Text(
                      'Save Changes',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600, // Semi-bold text
                        color: Colors.white, // White text color
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }


  Widget _buildTextField(String label, TextEditingController controller) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFF22C55F), width: 2.0),
        ),
      ),
    );
  }
}
