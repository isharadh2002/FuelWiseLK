import  { useState } from "react";
import { styled } from "@mui/material/styles";
import {Paper, TextField, Button, Box, Card, Grid, Typography, Snackbar} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";

import ServerHost from "../../ServerHost.jsx";

function VehicleForm() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
  }));

  const [errors, setErrors] = useState({});
  const [ isSubmitted,setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    licensePlate: "",
    vehicleModel: "",
    ownerId: localStorage.getItem("ownerId") || 0,
    vehicleQuota:50.0
  });
  const[snackbarOpen,setSnackbarOpen]=useState(false);
  const[snackbarMessage,setSnackbarMessage]=useState("");
  const CustomTextField = ({ name, onChange, id, label, error, value, helperText }) => (
      <TextField
          name={name}
          onChange={onChange}
          id={id}
          label={label}
          variant="outlined"
          color="success"
          fullWidth
          required
          value={value}
          error={!!error}
          helperText={helperText || ""}
          sx={{
            marginBottom: "20px",
            marginTop: "20px",
            width: "265px",
          }}
          aria-describedby={`${name}-helper-text`}
      />
  );

  CustomTextField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.bool,
    value: PropTypes.string,
    helperText: PropTypes.string,
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const validation = () => {
    console.log(formData.ownerId);
    const newErrors = {};
    if (!formData.licensePlate.trim()) newErrors.brand = "License Plate is required.";
    if (!formData.vehicleModel.trim()) newErrors.model = "Vehicle Model is required.";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSnackbarClose=()=>{
    setSnackbarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validation()) {
      return;
    }

    setLoading(true);
    postingData();
  };

  const postingData = async () => {
    try {
      const apiUrl =  `${ServerHost}/api/v1/VehicleForm/addVehicle`;
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });




      setSnackbarMessage( response.data);
      setSnackbarOpen(true);
      setFormData({  licensePlate: "", vehicleModel: ""});
      setErrors({});
      setIsSubmitted(false);
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || "Failed to add vehicle");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="m my-28 flex justify-center items-center">
        <Box sx={{ display:"flex", alignItems: "center", justifyContent: "center", width: "auto", height: "auto" }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 2 }}>



            <Card sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column", maxWidth: 345, boxShadow: "5px", margin: "25px", backgroundColor: "#f0fff2" }}>
              <Typography fontSize="40px" color="success" fontWeight={700}>
                Register Form
              </Typography>

              <div className="mx-10 my-8">
                <form className="flex items-center justify-center flex-col w-full " onSubmit={handleSubmit}>
                  {[
                    { name: "licensePlate", label: "Vehicle License Plate" },
                    { name: "vehicleModel", label: "Vehicle Model" },

                  ].map(({ name, label }) => (
                      <CustomTextField
                          key={name}
                          onChange={handleInputs}
                          id={name}
                          label={label}
                          name={name}
                          value={formData[name]}
                          error={!!errors[name]}
                          helperText={errors[name] || ""}
                      />
                  ))}

                  <div>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                          width: "265px",
                          marginBottom: "18px",
                          marginTop: "12px",
                          borderRadius: "10px",
                        }}
                        type="submit"

                    >
                      <Typography>{loading ? "Submitting..." : "Register"}</Typography>
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </Grid>
        </Box>
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
        />
      </div>
  );
}

export default VehicleForm;
