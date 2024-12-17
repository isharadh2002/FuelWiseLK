import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { login } from "../api/apiClient";

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  margin: 0 auto;
  margin-top: 10vh;
`;

const StyledInput = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const LoginForm = () => {
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { token } = await login(values);
        localStorage.setItem("jwtToken", token); // Store token locally
        alert("Login successful! Redirecting...");
        window.location.href = "/dashboard"; // Redirect to dashboard
      } catch (err) {
        setError("Invalid username or password");
      }
    },
  });

  return (
    <FormWrapper>
      <form onSubmit={formik.handleSubmit}>
        <label>Username</label>
        <StyledInput
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && (
          <div style={{ color: "red" }}>{formik.errors.username}</div>
        )}

        <label>Password</label>
        <StyledInput
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button
          type="submit"
          style={{ marginTop: "1rem", padding: "0.75rem", width: "100%" }}
        >
          Login
        </button>

        <div style={{ marginTop: "1rem" }}>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="/forgot-password" style={{ float: "right" }}>
            Forgot password?
          </a>
        </div>

        <div style={{ marginTop: "1rem" }}>
          Don&apos;t have an account? <a href="/register">Register</a>
        </div>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
