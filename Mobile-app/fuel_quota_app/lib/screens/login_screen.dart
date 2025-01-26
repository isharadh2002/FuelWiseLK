import 'package:flutter/material.dart';
import 'package:fuel_quota_app/screens/register_screen.dart';
import '../widgets/forgot_password_popup.dart';
import '../controllers/login_controller.dart';

class LoginScreen extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

            Image.asset(
              'assets/website_logo.png',
              width: 150,
              height: 150,
            ),

            const SizedBox(height: 10.0),

            const Text(
              'Login',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),

            const SizedBox(height: 20.0),

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


          const SizedBox(height: 16.0),

            ElevatedButton(
              onPressed: () {
                LoginController().login(
                  context,
                  emailController.text,
                  passwordController.text,
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
                    'Login',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600, // Semi-bold text
                      color: Colors.white, // White text color
                    ),
                  ),
                ),
              ),
            ),


            const SizedBox(height: 16.0),

            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => RegistrationScreen()),
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
                    'Register',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600, // Semi-bold text
                      color: Colors.white, // White text color
                    ),
                  ),
                ),
              ),
            ),



            const SizedBox(height: 10.0),

            TextButton(
              onPressed: () {
                ForgotPasswordPopup.show(context);
              },
              child: const Text(
                'Forgot Password?',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF22C55F),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
