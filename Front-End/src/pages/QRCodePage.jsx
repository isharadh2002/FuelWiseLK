import React, { useState } from "react";
import axios from "axios";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";

const QRCodePage = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);
  const [error, setError] = useState("");

  const fetchQRCode = async () => {
    try {
      setError(""); // Clear any previous errors
      const response = await axios.get(`http://localhost:8080/api/v1/qr/${vehicleId}`);
      setQrCodeData(response.data.qrCodeData); // Update QR code data
    } catch (err) {
      setQrCodeData(null);
      setError("Error fetching QR Code. Please check the Vehicle ID.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-50 py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900">QR Code Generator</h1>
          <p className="text-green-700">Enter your Vehicle ID to view your QR code</p>
        </div>

        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <input
            type="text"
            placeholder="Enter Vehicle ID"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="block w-full border border-green-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            onClick={fetchQRCode}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Fetch QR Code
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {qrCodeData && (
            <div className="mt-8 text-center">
              <h3 className="text-green-800 font-semibold mb-4">Your QR Code:</h3>
              <img
                src={`data:image/png;base64,${qrCodeData}`}
                alt="QR Code"
                className="inline-block shadow-md border border-green-200"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QRCodePage;
