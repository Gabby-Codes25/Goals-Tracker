'use client'

import React, { useState } from 'react';

function EditGoalForm({ editedGoal, onUpdate, onCancel }) {
  const [editedTitle, setEditedTitle] = useState(editedGoal.title);
  const [editedBody, setEditedBody] = useState(editedGoal.body);

  const handleUpdate = () => {
    const updatedGoal = {
      ...editedGoal,
      title: editedTitle,
      body: editedBody,
    };

    // Call the onUpdate function from the parent component
    onUpdate(updatedGoal);

    // Clear the form and close the edit form
    setEditedTitle('');
    setEditedBody('');
    onCancel();
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Edit Goal</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="editedTitle" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="editedTitle"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="editedBody" className="block text-sm font-medium text-gray-600">
            Body
          </label>
          <textarea
            id="editedBody"
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGoalForm;
