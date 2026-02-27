import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import TodoList from "./Pages/TodoList.jsx";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/TodoList" element={<TodoList />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
