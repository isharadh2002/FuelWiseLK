import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  async function login(event) {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      await axios
        .post("http://localhost:8080/api/v1/Admin/login", {
          email: email,
          password: password,
        })
        .then(
          (res) => {
            if (res.data.message === "Email not exists") {
              alert("Email not exists");
            } else if (res.data.message === "Login Success") {
              navigate("/admin/dashboard");
            } else {
              alert("Incorrect Email and Password do not match");
            }
          },
          (fail) => {
            console.error(fail);
          }
        );
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500">
      <div className="w-full max-w-lg p-10 bg-white bg-opacity-90 rounded-lg shadow-xl">
        <h2 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-md">
          Admin Login
        </h2>

        <form onSubmit={login}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your admin email"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            Login
          </button>

          <div className="mt-8 text-sm text-center text-gray-600">
            Return to{" "}
            <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Home Page
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
