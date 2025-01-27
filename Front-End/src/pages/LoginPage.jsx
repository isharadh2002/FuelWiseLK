import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
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
      const response = await axios.post("http://localhost:8080/api/v1/User/login", {
        email: email,
        password: password,
      });
    
      const res = response.data;
    
      console.log(res);
    
      if (res.message === "Email not exists") {
        alert("Email not exists");
      } else if (res.message === "Login Success") {
        const userId = res.id;
    
        if (userId) {
          localStorage.setItem("userId", userId);
          navigate("/home");
        } else {
          alert("Login Success, but userId not provided by the server.");
        }
      } else {
        alert("Incorrect Email and Password do not match");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login. Please try again.");
    }
    
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-500">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl sm:w-[26rem]">
        {/* Title */}
        <h2 className="mb-6 text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 drop-shadow-md">
          Welcome Back
        </h2>

        <form onSubmit={login}>
          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none focus:ring-opacity-50 hover:shadow-md"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none focus:ring-opacity-50 hover:shadow-md"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-400"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a
              href="/forgot-password"
              className="text-sm font-semibold text-green-600 transition-colors duration-300 hover:text-green-700"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="mt-8 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-green-600 transition-colors duration-300 hover:text-green-700"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
