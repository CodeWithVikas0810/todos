import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import TodoList from "./Pages/TodoList.jsx";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/TodoList" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
