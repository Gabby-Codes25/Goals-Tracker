'use client';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../app/Firebase/firebaseAuth';

const DeleteGoal = ({ goalId, onDelete }) => {
  const handleDelete = async () => { // No need to pass goalId here, it's already in scope
    try {
      const goalRef = doc(db, "goals", goalId);
      await deleteDoc(goalRef);
      console.log(`Goal with ID: ${goalId} deleted successfully.`);
      onDelete(goalId); // Notify parent to update UI
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      suppressHydrationWarning
    >
      {goalId ? "Delete" : "Loading..."} 
    </button>

  );
};

export default DeleteGoal;
