import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import axios from "axios";

import Pagination from '@mui/material/Pagination';
import '@mui/material/PaginationItem';

import PropTypes from "prop-types";
import "material/src/module/event.js";

function Analysing() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [error, setError] = useState(null);
    const itemsPerPage = 15;

    const dummyData = [{
        name: "Ishara Dhanushan",
        vehicleNum: "CAB-7651",
        defineQTY: 50,
        remaineQTY: 20
    },
    {
        name: "Ishara Dhanushan",
        vehicleNum: "CAB-7551",
        defineQTY: 50,
        remaineQTY: 30


    },
    {
        name: "Ishara Dhanushan",
        vehicleNum: "CAB-7851",
        defineQTY: 50,
        remaineQTY: 40
    }];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("url");

                setData(Array.isArray(response.data) ? response.data : []);

            } catch (error) {
                console.log("Error Occurred");
                setError(error.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handlePageination = (event, value) => {
        setCurrentPage(value);
    };
    const paginationedData = data.length > 0
        ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : dummyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", marginTop: 5 }}>
                <Typography style={{ color: "red" }}>Error: {error}</Typography>
                <button onClick={() => window.location.reload()}>Retry</button>
            </Box>
        );
    }

    const QTY = ({ name, vehicleNum, defineQTY, remaineQTY }) => (
        <Box
            sx={{
                margin: "50px auto",
                width: "100%",
                bgcolor: grey[50],
                boxShadow: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 5,
                padding: 3,
            }}
        >
            <Box sx={{ margin: 3 }}>
                <Typography
                    sx={{
                        color: green[600],
                        fontSize: "18px",
                        fontWeight: 800,
                        margin: 1,
                        textAlign: "left",
                    }}
                >
                    Name: {name}
                </Typography>
                <Typography sx={{ fontSize: "16px", color: green[600], margin: 2 }}>
                    Vehicle-Number: {vehicleNum}
                </Typography>
                <Typography sx={{ fontSize: "16px", color: green[600], margin: 2 }}>
                    Defined Quota: {defineQTY}L
                </Typography>
                <Typography sx={{ fontSize: "16px", color: green[600], margin: 2 }}>
                    Remaining Quota: {remaineQTY}L
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: defineQTY - remaineQTY, label: "Used" },
                                { id: 1, value: remaineQTY, label: "Remaining" },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </Box>
        </Box>
    );
    QTY.propTypes = {
        name: PropTypes.string,
        vehicleNum: PropTypes.string,
        defineQTY: PropTypes.number,
        remaineQTY: PropTypes.number
    };
    return (
        <Box sx={{ padding: 3 }}>
            {error && (
                <p style={{ color: "red", marginLeft: "10px" }}>
                    Error: {error}. Displaying dummy data instead.
                </p>
            )
            }
            <Typography>Analysing the Quota</Typography>
            {paginationedData.map((user, index) => (


                <QTY
                    key={index}
                    name={user.name}
                    vehicleNum={user.vehicleNum}
                    defineQTY={user.defineQTY}
                    remaineQTY={user.remaineQTY}


                />
            ))
            }
            <Pagination
                count={Math.ceil((data.length > 0 ? data.length : dummyData.length) / itemsPerPage)}
                page={currentPage}
                onChange={handlePageination}
                sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}

            />

        </Box>

    );


}

export default Analysing;
