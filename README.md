# FuelWise.lk - Fuel Quota Management System

## 🚀 Overview
FuelWise.lk is a comprehensive fuel quota management system designed to address fuel distribution challenges in Sri Lanka. The platform facilitates efficient fuel distribution by connecting vehicle owners, fuel stations, and system administrators through a unified digital platform.

## ✨ Key Features

### For Vehicle Owners
- Online vehicle registration portal
- Automated vehicle information validation through DMT database
- Unique QR code generation for each registered vehicle
- Real-time SMS notifications for fuel purchases
- Quota balance tracking

### For Fuel Station Owners
- Dedicated registration portal for fuel stations
- Real-time fuel quota verification
- Secure authentication system

### For Fuel Station Operators
- Flutter mobile application for QR code scanning
- Real-time quota balance checking
- Fuel dispensing recording system
- Automated notification system

### For Administrators
- Comprehensive monitoring dashboard
- Fuel distribution tracking
- Fuel station registration management
- System-wide analytics

## 🛠 Technology Stack

### Backend
- Java Spring Boot
- Spring Security with JWT authentication
- JPA/Hibernate for database operations
- RESTful API architecture

### Frontend
- Vite + React.js for web portals
- Flutter for mobile application
- Material-UI/Tailwind CSS for web interface

### Database
- PostgreSQL

### External Services
- Twilio for SMS notifications
- JWT for secure authentication

## 📱 Applications

The system consists of multiple components:
1. Vehicle Owner Portal (Vite React Web Application)
2. Fuel Station Owner Portal (Vite React Web Application)
3. Admin Portal (Vite React Web Application)
4. Fuel Station Operator App (Flutter Application)
5. Backend API Server (Spring Boot)

## 🚀 Getting Started

### Prerequisites
- Java JDK 11 or higher
- Node.js 16.x or higher
- Flutter SDK 3.x or higher
- PostgreSQL 12.x or higher
- Maven 3.x

### Backend Setup (Spring Boot)
1. Clone the repository
   ```bash
   git clone https://github.com/MininduBimsara/FuelWiseLK.git
   ```

2. Navigate to the backend directory
   ```bash
   cd FuelWiseLK/Back-End
   ```

3. Configure database properties in `application.properties`
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/fuelwise
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

4. Build and run the application
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup (Vite React)
1. Navigate to the frontend directory
   ```bash
   cd FuelWiseLK/Front-End
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

### Mobile App Setup (Flutter)
1. Navigate to the mobile app directory
   ```bash
   cd FuelWiseLK/Mobile-app/fuel_quota_app
   ```

2. Get Flutter dependencies
   ```bash
   flutter pub get
   ```

3. Run the application
   ```bash
   flutter run
   ```

4. For building release APK
   ```bash
   flutter build apk --release
   ```

## 📝 API Documentation
API documentation is available at `/api/swagger-ui.html` when running the backend server.

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👥 Team Members
- SE/2021/001 - Isuru Ranasundara
- SE/2021/016 - Sahani Mohottige
- SE/2021/027 - Ishara Dhanushan
- SE/2021/037 - Minindu Bimsara
- SE/2021/038 - Ramitha Pathmila

## 📞 Contact
Project Link: [https://github.com/MininduBimsara/FuelWiseLK](https://github.com/MininduBimsara/FuelWiseLK)
