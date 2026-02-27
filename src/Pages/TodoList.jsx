import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "../Components/List";
import { useNavigate } from "react-router-dom";

const URL = "https://todo-backend-1-8ra9.onrender.com/api/todos";

function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    } else {
      fetchTodos();
    }
  }, [navigate]);

  const fetchTodos = async () => {
    const userId = localStorage.getItem("userId");
    try {
      setLoading(true);
      const response = await axios.get(`${URL}?userId=${userId}`);
      //   const todoList = response.data.data.map((val) => val.todo);
      // console.log(response.data)
      setTodos(response.data.data);
      //   console.log(todoList);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      if (edit) {
        const response = await axios.put(`${URL}/${edit}`, {
          todo: input,
          userId: localStorage.getItem("userId"),
        });
        setTodos(
          todos.map((todo) => (todo._id === edit ? response.data.data : todo)),
        );
        setEdit(null);
      } else {
        const userId = localStorage.getItem("userId");
        const response = await axios.post(URL, {
          todo: input,
          userId,
        });
        setTodos([...todos, response.data.data]);
      }
      setInput("");
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setInput(todo.todo);
    setEdit(todo._id);
    // console.log(todo);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${URL}/${id}`, {
        data: { userid: localStorage.getItem("userId") },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
    console.log(id);
  };

  const handleCancel = () => {
    setInput("");
    setEdit(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className=" p-10 bg-linear-to-br from-purple-600 via-purple-700 to-indigo-800 min-h-screen">
      <nav className="bg-[#7688E6] shadow-lg px-6 py-4 sticky top-0 z-50 rounded-2xl">
        <div className="max-w-3xl mx-auto flex justify-between items-center ">
          <h1 className="text-3xl font-bold  text-white">My Todo App</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200 hover:scale-105 cursor-pointer font-medium shadow-md"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto mt-5 rounded-2xl bg-linear-to-r from-white to-purple-100 shadow-xl">
        <div className="flex flex-col w-full items-center p-10 gap-4">
          <h2 className="text-4xl font-bold">To Do List</h2>
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Enter todo here"
              className="border p-2 rounded-lg flex-1 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              className="border rounded-lg p-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 cursor-pointer transition duration-200 hover:scale-105"
            >
              {loading
                ? edit
                  ? "Updating..."
                  : "Adding..."
                : edit
                  ? "Update"
                  : "Add"}
            </button>
            <button
              onClick={handleCancel}
              disabled={!input.trim()}
              className={`border rounded-lg p-2 text-white  px-4 py-1 
                  ${
                    input.trim()
                      ? "bg-blue-500 cursor-pointer transition duration-200 hover:scale-105 hover:bg-blue-600 "
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="w-full px-10 pb-10">
          {!loading && todos.length > 0 && (
            <List
              todos={todos}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
