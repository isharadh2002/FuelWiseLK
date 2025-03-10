import React, { useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

import ServerHost from "../../ServerHost.jsx";

const ResetFuelQuota = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleReset = async () => {
    setIsLoading(true);
    setStatus(null);

    try {
      // Replace with your actual API endpoint
      await axios.put(`${ServerHost}/api/v1/FuelQuota/resetQuota`);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-lg p-8 text-center transition-all duration-300 bg-white shadow-xl rounded-2xl hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900">Reset Fuel Quotas</h1>
        <p className="mt-3 text-gray-600">
          Click the button below to reset fuel quotas for all vehicles.
        </p>

        <button
          onClick={handleReset}
          disabled={isLoading}
          className={`w-full h-14 mt-6 text-lg font-semibold text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300
            ${isLoading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 active:bg-green-800"}`}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          {isLoading ? "Processing..." : "Reset All Fuel Quotas"}
        </button>

        {status === "success" && (
          <div className="flex items-center gap-2 p-4 mt-5 text-green-700 border border-green-200 rounded-xl bg-green-50">
            <CheckCircle className="w-5 h-5" /> Successfully reset fuel quotas
            for all vehicles.
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 p-4 mt-5 text-red-700 border border-red-200 rounded-xl bg-red-50">
            <XCircle className="w-5 h-5" /> Failed to reset fuel quotas. Please
            try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetFuelQuota;
