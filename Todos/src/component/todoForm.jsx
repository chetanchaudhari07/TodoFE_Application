import { useState, useEffect } from "react";
import api from "../services/api";

const TodoForm = ({ onSuccess, editingTodo }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    priority: "Medium",
    mentions: "",
    visibility: "private"
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        ...editingTodo,
        tags: editingTodo.tags.join(", "),
        mentions: editingTodo.mentions.map((m) => m.username).join(", "),
        visibility: editingTodo.visibility || "private"
      });
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()),
        mentions: formData.mentions.split(",").map((m) => m.trim()),
      };
      if (editingTodo) {
        await api.put(`/todos/${editingTodo._id}`, data);
      } else {
        await api.post("/todos", data);
      }
      onSuccess();
      setFormData({ title: "", description: "", tags: "", priority: "Medium", mentions: "" });
    } catch (err) {
      alert("Error saving todo");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4"
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {editingTodo ? "Edit Todo" : "Add New Todo"}
      </h3>

      <input
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
        required
      />

      <textarea
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
      />

      <input
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        placeholder="Tags (comma separated)"
      />

      <select
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <input
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
        value={formData.mentions}
        onChange={(e) => setFormData({ ...formData, mentions: e.target.value })}
        placeholder="@usernames (comma separated)"
      />


      <select
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
        value={formData.visibility}
        onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
      >
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {editingTodo ? "Update" : "Add"} Todo
      </button>
    </form>
  );
};

export default TodoForm;
