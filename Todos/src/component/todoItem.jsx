
const TodoItem = ({ todo, onDelete, onEdit, currentUserId }) => {
  const token = localStorage.getItem("token");
  const isOwner = (todo.user === currentUserId || todo.user?._id === currentUserId ) && token;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
      <p className="text-gray-600">{todo.description}</p>
      <p className="text-sm mt-1"><span className="font-medium">Tags:</span> {todo.tags.join(", ")}</p>
      <p className="text-sm"><span className="font-medium">Priority:</span> {todo.priority}</p>
      <p className="text-sm"><span className="font-medium">Mentions:</span> {todo.mentions.map(u => u.username).join(", ")}</p>
      <p className="text-sm"><span className="font-medium">Visibility:</span> {todo.visibility}</p>

      {isOwner && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={onEdit}
            className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
