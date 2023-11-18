'use client'

import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import GoalCard from '../components/GoalCard';
import EditGoalForm from '../components/editGoalForm';

function Page() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedGoal, setEditedGoal] = useState(null);

  // Example: Check if user is authenticated (you need to replace this logic)
  const isAuthenticated = true; // Replace with your authentication check logic
  
  const handleEdit = (selectedGoal) => {
    // Set the selected goal to be edited
    setEditedGoal(selectedGoal);
  };

  const handleDelete = (goalId) => {
    // Filter out the goal to be deleted
    const updatedGoals = goals.filter((goal) => goal._id !== goalId);
    // Update the state with the new goals
    setGoals(updatedGoals);
  };

  const handleUpdate = (updatedGoal) => {
    // Find the index of the edited goal in the array
    const index = goals.findIndex((goal) => goal._id === updatedGoal._id);
    // Update the state with the edited goal
    setGoals((prevGoals) => [
      ...prevGoals.slice(0, index),
      updatedGoal,
      ...prevGoals.slice(index + 1),
    ]);
    // Clear the edited goal
    setEditedGoal(null);
  };


  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/goals');
        const data = await response.json();

        if (response.ok) {
          setGoals(data);
        } else {
          setError(`Failed to fetch goals: ${data.message}`);
        }
      } catch (error) {
        console.error('Error fetching goals:', error);
        setError('An error occurred while fetching goals');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 font-bold">{error}</p>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <>
          <h1 className="text-3xl font-bold mb-4">My Goals</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {editedGoal && (
            <EditGoalForm
              editedGoal={editedGoal}
              onUpdate={handleUpdate}
              onCancel={() => setEditedGoal(null)}
            />
          )}
          </div>
      </>
      ) : (
        <p className="text-red-600 font-bold">Please log in to view goals</p>
      )}
    </div>
  );
}

export default Page;
