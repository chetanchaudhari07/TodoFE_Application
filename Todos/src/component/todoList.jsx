import { useEffect, useState } from "react";
import api from "../services/api";
import TodoItem from "./todoItem";
import FilterBar from "./filterBar";
import TodoForm from "./todoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ page: 1, limit: 5 });
  const [loading, setLoading] = useState(true);
  const [editTodo, setEditTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/todos", { params: filters });
      setTodos(res.data);
    } catch (err) {
      alert("Error fetching todos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this todo?")) return;
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">📝 Your Todos</h2>

      <TodoForm onSuccess={fetchTodos} editingTodo={editTodo} />

      <FilterBar filters={filters} setFilters={setFilters} />

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos found.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={handleDelete}
            onEdit={() => setEditTodo(todo)}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
