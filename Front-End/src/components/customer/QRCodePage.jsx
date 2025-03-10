import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

import ServerHost from "../../ServerHost.jsx";

const QRCodePage = () => {
    const { vehicleId } = useParams();
    const [qrCode, setQrCode] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const response = await axios.get(`${ServerHost}/api/v1/qr/${vehicleId}`);
                if (response.data && response.data.qrCodeData) {
                    setQrCode(response.data.qrCodeData);
                } else {
                    setError("QR Code not found for this vehicle.");
                }
            } catch (error) {
                setError("There was an error fetching the QR code!");
                console.error("Error fetching QR code:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQRCode();
    }, [vehicleId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Include the Header component */}
            <Header />

            <div className="p-6 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-800 mb-6">QR Code for Vehicle</h1>
                    <div className="p-4 border-2 border-green-300 rounded-lg">
                        {/* Display QR Code Image */}
                        <img
                            src={`data:image/png;base64,${qrCode}`}
                            alt="QR Code"
                            className="mx-auto"
                        />
                        <p className="mt-4 text-green-600">QR Code for Vehicle ID: {vehicleId}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodePage;
