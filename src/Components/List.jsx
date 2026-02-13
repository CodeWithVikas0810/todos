import React from "react";

function List({ todos, handleEdit, handleDelete }) {
  return (
    <div className="w-full">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex items-center justify-between mb-2 gap-5 bg-gray-50 py-5 px-10 rounded-2xl"
        >
          <span className="text-2xl">{todo.todo}</span>
          <div className="flex gap-2">
            <button
              className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer transition duration-200 hover:scale-105"
              onClick={() => handleEdit(todo)}
            >
              Edit
            </button>
            <button
              className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer transition duration-200 hover:scale-105"
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}

export default List;
