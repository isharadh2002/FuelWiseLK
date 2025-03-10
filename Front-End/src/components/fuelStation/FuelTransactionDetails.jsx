import { useEffect, useState } from "react";
import { Fuel, Clock } from "lucide-react";

import ServerHost from "../../ServerHost.jsx";

export default function FuelTransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [vehicleDetails, setVehicleDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const stationID = localStorage.getItem("stationId");

    useEffect(() => {
        if (stationID) {
            fetch(`${ServerHost}/api/v1/FuelTransaction/getTransactions/${stationID}`)
                .then((res) => res.json())
                .then((data) => {
                    // Sort transactions by transactionID in descending order
                    const sortedData = data.sort((a, b) => b.transactionID - a.transactionID);
                    setTransactions(sortedData);

                    // Fetch vehicle details for each transaction
                    sortedData.forEach(transaction => {
                        fetchVehicleDetails(transaction.vehicleID);
                    });
                })
                .catch((error) => console.error("Error fetching transactions:", error));
        }
    }, [stationID]);

    const fetchVehicleDetails = (vehicleID) => {
        if (!vehicleDetails[vehicleID]) {  // Fetch only if not already stored
            fetch(`${ServerHost}/api/v1/vehicles/get/${vehicleID}`)
                .then((res) => res.json())
                .then((data) => {
                    setVehicleDetails(prevDetails => ({
                        ...prevDetails,
                        [vehicleID]: data
                    }));
                })
                .catch((error) => console.error("Error fetching vehicle details:", error));
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    return (
        <>
            <div className="m-5 mt-10">
                <h2 className="text-4xl font-bold text-black text-center">Transaction Records</h2>
            </div>
            <div className="flex flex-col items-center p-4">
                <div className="w-full max-w-5xl">
                    {currentTransactions.map((transaction) => {
                        const vehicle = vehicleDetails[transaction.vehicleID];
                        return (
                            <div key={transaction.transactionID}
                                 className="shadow-lg rounded-xl p-4 border border-gray-300 bg-white w-full mb-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Fuel className="text-blue-500"/> Transaction #{transaction.transactionID}
                                </h2>
                                <div className="flex flex-row flex-wrap gap-x-10">
                                    <p className="text-gray-600">Transaction ID: {transaction.transactionID}</p>
                                    <p className="text-gray-600">Fuel Type: {transaction.fuelType}</p>
                                    <p className="text-gray-600">Pumped Litres: {transaction.pumpedLitres}</p>
                                    {/* <p className="text-gray-600">Remaining Quota: {transaction.remainingQuota}</p> */}
                                </div>

                                {/* Vehicle Details */}
                                {vehicle ? (
                                    <div className="flex flex-row flex-wrap gap-x-10 border-t mt-1 pt-1">
                                        <p className="text-gray-800">Vehicle Details</p>
                                        <p className="text-gray-600">Registration Number: {vehicle.registrationNumber}</p>
                                        <p className="text-gray-600">Vehicle Model: {vehicle.vehicleModel}</p>
                                        <p className="text-gray-600">Owner Name: {vehicle.ownerName}</p>
                                        {/*<p className="text-gray-600">Fuel Quota: {vehicle.vehicleFuelQuota}</p>*/}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 mt-3">Fetching vehicle details...</p>
                                )}

                                <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                                    <Clock className="text-gray-400"/> {new Date(transaction.transactionTime).toLocaleString()}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
                        Previous
                    </button>
                    <span className="px-4 py-2 text-gray-700">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
