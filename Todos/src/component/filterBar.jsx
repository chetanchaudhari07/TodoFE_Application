import React, { useState } from "react";

const FilterBar = ({ filters, setFilters }) => {
  const [priority, setPriority] = useState(filters.priority || "");
  const [tag, setTag] = useState(filters.tag || "");
  const [mention, setMention] = useState(filters.mention || "");
  const [sortBy, setSortBy] = useState(filters.sortBy || "createdAt");

  const handleFilterChange = () => {
    setFilters({
      ...filters,
      priority,
      tag,
      mention,
      sortBy,
      page: 1, 
    });
  };

  const clearFilters = () => {
    setPriority("");
    setTag("");
    setMention("");
    setSortBy("createdAt");
    setFilters({ page: 1, limit: filters.limit });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">Filter & Sort</h4>
      <div className="flex flex-wrap gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Filter by tag"
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          value={mention}
          onChange={(e) => setMention(e.target.value)}
          placeholder="Mentioned user"
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="createdAt">Newest First</option>
          <option value="priority">By Priority</option>
          <option value="title">By Title</option>
        </select>

        <button
          onClick={handleFilterChange}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Apply
        </button>
        <button
          onClick={clearFilters}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
