// src/components/common/InputField.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}) => (
  <div style={{ marginBottom: "16px" }}>
    <label
      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "16px",
      }}
    />
  </div>
);

export default InputField;
