import 'package:flutter/material.dart';

import '../controllers/login_controller.dart';

class RegistrationScreen extends StatelessWidget {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();

  RegistrationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height, // Match the screen height
          padding: const EdgeInsets.all(16.0),
          child: Center(
            child: Column(
              mainAxisSize: MainAxisSize.min, // Shrink to fit content
              children: [
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

                // Name field
                TextField(
                  controller: nameController,
                  decoration: InputDecoration(
                    labelText: 'Name',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(color: Color(0xFF22C55F), width: 2.0),
                    ),
                  ),
                ),

                const SizedBox(height: 20.0),

                // Email field
                TextField(
                  controller: emailController,
                  decoration: InputDecoration(
                    labelText: 'Email',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(color: Color(0xFF22C55F), width: 2.0),
                    ),
                  ),
                ),

                const SizedBox(height: 20.0),

                // Password field
                TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(color: Color(0xFF22C55F), width: 2.0),
                    ),
                  ),
                ),

                const SizedBox(height: 20.0),

                // Phone field
                TextField(
                  controller: phoneController,
                  decoration: InputDecoration(
                    labelText: 'Phone Number',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(color: Color(0xFF22C55F), width: 2.0),
                    ),
                  ),
                ),

                const SizedBox(height: 20.0),

                // Register button
                ElevatedButton(
                  onPressed: () {
                    LoginController().register(
                      context,
                      nameController.text,
                      emailController.text,
                      passwordController.text,
                      phoneController.text,
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
                    Navigator.pop(context); // Navigate back to the login screen
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
}
