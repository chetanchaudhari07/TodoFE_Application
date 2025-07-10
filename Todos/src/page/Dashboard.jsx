import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import TodoForm from "../component/todoForm";
import FilterBar from "../component/filterBar";
import TodoItem from "../component/todoItem";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ page: 1, limit: 5 });
  const [loading, setLoading] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/todos", { params: filters });
      setTodos(res.data);
    } catch (err) {
      alert("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      await api.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      alert("Failed to delete todo");
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">📝 Todo Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

     
      <TodoForm onSuccess={fetchTodos} editingTodo={editTodo} />

     
      <FilterBar filters={filters} setFilters={setFilters} />

      
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos found.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            
            onDelete={handleDelete}
            onEdit={() => handleEdit(todo)}
          />
        ))
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={filters.page <= 1}
          onClick={() =>
            setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
          }
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span className="text-gray-600 font-semibold">
          Page {filters.page}
        </span>
        <button
          onClick={() =>
            setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
          }
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
