// src/components/vehicle/VehicleForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import InputField from "../common/InputField";

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    ownerName: "",
    model: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vehicle Registered:", formData);
    // Call API to register vehicle
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <InputField
        label="Vehicle Number"
        name="vehicleNumber"
        value={formData.vehicleNumber}
        onChange={handleChange}
        required
      />
      <InputField
        label="Owner Name"
        name="ownerName"
        value={formData.ownerName}
        onChange={handleChange}
        required
      />
      <InputField
        label="Vehicle Model"
        name="model"
        value={formData.model}
        onChange={handleChange}
        required
      />
      <button type="submit" className="primary-btn">
        Register Vehicle
      </button>
    </form>
  );
};

export default VehicleForm;
