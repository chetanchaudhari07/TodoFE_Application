import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TodoItem from "../component/todoItem";
import { Link } from 'react-router-dom';

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos/todo'); 
        console.log("Public Todos:", res.data);
      setTodos(res.data);
    } catch (error) {
      alert('Failed to fetch todos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Public Todos</h1>
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Login
        </Link>
      </header>

      
      <div className="bg-white shadow rounded-lg p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos found.</p>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
