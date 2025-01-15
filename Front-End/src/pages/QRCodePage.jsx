import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QRCodePage = () => {
  const { vehicleId } = useParams(); // Get vehicleId from the URL
  const [qrCodeData, setQrCodeData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the QR Code data from the backend
    const fetchQRCode = async () => {
      try {
        const response = await axios.get(`/api/v1/qr/${vehicleId}`);
        setQrCodeData(response.data.qrCodeData); // Set QR Code Base64 string
        setLoading(false);
      } catch (err) {
        console.error("Error fetching QR code:", err);
        setError("Failed to load QR code. Please try again later.");
        setLoading(false);
      }
    };

    fetchQRCode();
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="w-8 h-8 border-4 border-green-600 rounded-full border-t-transparent animate-spin" />
        <p className="mt-4 text-lg text-green-700">Loading QR Code...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 mb-4 text-red-600 bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mb-4 text-red-600">{error}</p>
            <button
              onClick={() => window.history.goBack()}
              className="px-4 py-2 text-green-600 transition-colors border border-green-600 rounded-md hover:bg-green-50"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-green-800">
          Vehicle QR Code
        </h1>
        <div className="flex flex-col items-center">
          {qrCodeData ? (
            <div className="p-4 transition-transform bg-white shadow-lg rounded-xl hover:scale-105">
              <img
                src={qrCodeData}
                alt="QR Code"
                className="w-64 h-64 rounded-lg"
              />
            </div>
          ) : (
            <div className="p-6 text-center rounded-lg bg-red-50">
              <p className="text-red-600">
                No QR Code available for this vehicle.
              </p>
            </div>
          )}

          <div className="w-full mt-8 space-y-4">
            <button
              onClick={() => window.history.goBack()}
              className="w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
            >
              Go Back
            </button>

            {qrCodeData && (
              <button
                onClick={() => window.print()}
                className="w-full px-4 py-2 text-green-600 transition-colors border border-green-600 rounded-md hover:bg-green-50"
              >
                Print QR Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
