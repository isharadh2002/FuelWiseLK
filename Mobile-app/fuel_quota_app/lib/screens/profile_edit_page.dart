import 'package:flutter/material.dart';
import '../controllers/profile_controller.dart';

class ProfileEditPage extends StatelessWidget {
  final String userId;
  final String name;
  final String email;
  final String fuelStation;

  final TextEditingController nameController;
  final TextEditingController emailController;
  final TextEditingController fuelStationController;

  ProfileEditPage({
    super.key,
    required this.userId,
    required this.name,
    required this.email,
    required this.fuelStation,
  })  : nameController = TextEditingController(text: name),
        emailController = TextEditingController(text: email),
        fuelStationController = TextEditingController(text: fuelStation);

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
            _buildTextField('Fuel Station', fuelStationController),
            const Spacer(),
            ElevatedButton(
              onPressed: () {
                ProfileController().updateProfile(
                  context,
                  userId,
                  {
                    'name': nameController.text,
                    'email': emailController.text,
                    'fuelStation': fuelStationController.text,
                  },
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF22C55F),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text('Save Changes'),
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
