import React from "react";
import styled from "@emotion/styled";

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

const StyledButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem;
  width: 100%;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

const LoginForm = () => {
  return (
    <FormWrapper>
      <form>
        <label>Username</label>
        <StyledInput
          name="username"
          type="text"
          placeholder="Enter your username"
        />

        <label>Password</label>
        <StyledInput
          name="password"
          type="password"
          placeholder="Enter your password"
        />

        <StyledButton type="submit">Login</StyledButton>

        <div style={{ marginTop: "1rem" }}>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a
            href="/forgot-password"
            style={{ float: "right", textDecoration: "none", color: "#1976d2" }}
          >
            Forgot password?
          </a>
        </div>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          Don't have an account?{" "}
          <a
            href="/register"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Register
          </a>
        </div>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
