import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {


const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

async function login(event) {
  event.preventDefault();
  try {
    await axios
      .post("http://localhost:8080/api/v1/VehicleOwner/login", {
        email: email,
        password: password,
      })
      .then(
        (res) => {
          console.log(res.data);

          if (res.data.message == "Email not exits") {
            alert("Email not exits");
          } else if (res.data.message == "Login Success") {
            navigate("/home");
          } else {
            alert("Incorrect Email and Password not match");
          }
        },
        (fail) => {
          console.error(fail); // Error!
        }
      );
  } catch (err) {
    alert(err);
  }
}

  
  return (
    <div className="flex items-center justify-center overflow-hidden bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-md sm:w-96">
        <h2 className="mb-6 text-2xl font-semibold text-center text-green-600">
          Welcome Back
        </h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={password}
              onClick={(event) => {setPassword(event.target.value);}}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="text-green-500 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>

          <div className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-green-600 hover:underline">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};


export default LoginForm;
