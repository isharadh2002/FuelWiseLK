import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: 20),
            // Profile Picture
            CircleAvatar(
              radius: 60,
              backgroundImage: CachedNetworkImageProvider(
                'https://via.placeholder.com/150',
              ),
            ),
            SizedBox(height: 10),
            // Name
            Text(
              'John Doe',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.green[900], // Dark green for name
              ),
            ),
            SizedBox(height: 5),
            // Email
            Text(
              'johndoe@example.com',
              style: TextStyle(
                fontSize: 16,
                color: Colors.green[600], // Lighter green for email
              ),
            ),
            SizedBox(height: 20),
            // Cards for additional information
            _buildInfoCard(
                Icons.phone, 'Phone', '+123 456 7890', Colors.green[700]!),
            _buildInfoCard(Icons.location_on, 'Location', 'Seoul, South Korea',
                Colors.green[700]!),
            _buildInfoCard(Icons.calendar_today, 'Date of Birth',
                'January 1, 1990', Colors.green[700]!),
            SizedBox(height: 20),
            // Logout Button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: ElevatedButton.icon(
                onPressed: () {
                  // Handle logout action here
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Logged Out')),
                  );
                },
                icon: Icon(Icons.logout),
                label: Text('Logout'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green[700], // Green shade for button
                  minimumSize: Size(double.infinity, 50), // Full-width button
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Helper method to build information cards
  Widget _buildInfoCard(
      IconData icon, String title, String subtitle, Color iconColor) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      child: ListTile(
        leading: Icon(icon, color: iconColor),
        title: Text(
          title,
          style: TextStyle(color: Colors.green[800]), // Text in green shade
        ),
        subtitle: Text(subtitle),
      ),
    );
  }
}
