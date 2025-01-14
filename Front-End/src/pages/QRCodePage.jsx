import React, { useEffect, useState } from "react";
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
        return <div className="text-center mt-10 text-green-700">Loading QR Code...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-700">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Your Vehicle QR Code</h1>
            {qrCodeData ? (
                <img src={qrCodeData} alt="QR Code" className="w-64 h-64 border-2 border-green-600 rounded-lg shadow-md" />
            ) : (
                <p className="text-red-600">No QR Code available for this vehicle.</p>
            )}
            <button
                onClick={() => window.history.back()}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
                Go Back
            </button>
        </div>
    );
};

export default QRCodePage;
