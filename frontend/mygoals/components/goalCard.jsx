'use client'

// GoalCard.jsx
import React from 'react';

function GoalCard({ goal, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">{goal.title}</h2>
      <p className="text-gray-700">{goal.body}</p>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
          onClick={() => onEdit(goal)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          onClick={() => onDelete(goal._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default GoalCard;
