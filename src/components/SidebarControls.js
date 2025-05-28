import React from "react";

export default function SidebarControls({
  newTitle,
  setNewTitle,
  handleAddSubtopic,
  selectedNode,
  editTitle,
  setEditTitle,
  handleEditTitle,
  newStatus,
  setNewStatus,
  handleStatusChange,
  handleDeleteNode,
}) {
  return (
    <div className="absolute top-4 right-4 p-4 rounded-lg shadow-lg flex flex-col gap-4 w-72 bg-white">
      <input
        type="text"
        placeholder="New Subtopic Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <button
        onClick={handleAddSubtopic}
        disabled={!selectedNode || !newTitle.trim()}
        className="bg-blue-500 text-white rounded px-3 py-1 disabled:bg-gray-500"
      >
        Add Subtopic
      </button>

      <input
        type="text"
        placeholder="Edit Title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <button
        onClick={handleEditTitle}
        disabled={!selectedNode || !editTitle.trim()}
        className="bg-yellow-500 text-white rounded px-3 py-1 disabled:bg-gray-500"
      >
        Edit Title
      </button>

      <div className="flex flex-col gap-2">
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          onClick={handleStatusChange}
          disabled={!selectedNode}
          className="bg-green-700 text-gray-300 rounded px-3 py-1 disabled:bg-gray-300"
        >
          Update Status
        </button>
        <button
          onClick={handleDeleteNode}
          disabled={!selectedNode}
          className="bg-red-700 text-gray-300 rounded px-3 py-1 disabled:bg-gray-300"
        >
          Delete Node
        </button>
      </div>
    </div>
  );
}
