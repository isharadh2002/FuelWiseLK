import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QRCodePage = () => {
    const { vehicleId } = useParams();
    const [qrCode, setQrCode] = useState(null);

    useEffect(() => {
        // Fetch the QR code for the vehicle
        axios.get(`/api/v1/qr/${vehicleId}`)
            .then(response => {
                setQrCode(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the QR code!", error);
            });
    }, [vehicleId]);

    if (!qrCode) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-6">QR Code for Vehicle</h1>
            <div className="p-4 border-2 border-green-300 rounded-lg">
                <img src={`data:image/png;base64,${qrCode.qrCodeImage}`} alt="QR Code" className="mx-auto" />
                <p className="mt-4 text-green-600">QR Code for Vehicle ID: {vehicleId}</p>
            </div>
        </div>
    );
};

export default QRCodePage;
