import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const valid = email.trim() && password.trim();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://todo-backend-1-8ra9.onrender.com/api/auth/login", { email, password })
      .then((result) => {
        console.log("Full response", result);
        console.log("response data", result.data);
        if (result.data.success) {
          localStorage.setItem("userId", result.data.userId);
          navigate("/TodoList");
          // console.log(result.data)
        } else {
          // navigate("/signup");
          // alert("You are not registered");
          console.log("wrong");
          toast.error("Wrong credentials");
        }
      })
      .catch((err) => {
        if (err.response) {
          // alert(err.response.data.message || "Login failed");
          toast.error(err.response?.data?.message || "Login failed");
        } else if (err.request) {
          toast.error(
            "Server is not responding. Please check if the backend is running.",
          );
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login Page</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              name="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={!valid}
            className={`w-full  py-2 rounded-md  
              ${
                valid
                  ? "bg-blue-600 text-white hover:bg-blue-700 transition duration-200 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }
              `}
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
