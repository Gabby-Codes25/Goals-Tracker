'use client'

import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/firebaseAuth';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import GoalCard from '../../components/goalCard';
import EditGoalForm from '../../components/editGoalForm';
import Loading from '../../components/loading';

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [editedGoal, setEditedGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const goalsCollectionRef = collection(db, "goals"); // Reference to Firestore collection

  //Fetch Goals from Firestore
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "goals"));
        const goalsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGoals(goalsList);
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGoals(); // Ensure only runs on client
  }, []); // Empty dependency array ensures it runs once
  

  //Add Goal to Firestore
  const addGoal = async (newGoal) => {
    try {
      await addDoc(collection(db, "goals"), {
        ...newGoal
      })
    } catch {
      console.error(error);
    }
};


  // Update Goal in Firestore
  const handleUpdate = async (updatedGoal) => {
    try {
      const goalRef = doc(db, "goals", updatedGoal.id);
      await updateDoc(goalRef, updatedGoal);

      setGoals(goals.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal)));
      setEditedGoal(null);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  //Delete Goal from Firestore
  const handleDelete = async (goalId) => {
    try {
      await deleteDoc(doc(db, "goals", goalId));
      setGoals(goals.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      {goals.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} onEdit={setEditedGoal} onDelete={handleDelete} />
        ))}
      </div>
        ) : (
          <p suppressHydrationWarning>No goals available.</p> // Suppresses mismatch error
        )}


      {editedGoal && (
        <EditGoalForm editedGoal={editedGoal} onUpdate={handleUpdate} onCancel={() => setEditedGoal(null)} />
      )}
    </div>
  );
}

export default GoalsPage;