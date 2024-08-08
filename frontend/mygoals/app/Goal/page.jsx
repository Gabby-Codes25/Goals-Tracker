'use client'

import React, { useState, useEffect } from 'react';
import GoalCard from '../../components/goalCard';
import EditGoalForm from '../../components/editGoalForm';
import Loading from '../../components/loading';

function page() {
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState(null);
    const [editedGoal, setEditedGoal] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // const isAuthenticated = false;
    
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
        <div>
            {goals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {goals.map((goal) => (
                    <GoalCard
                    key={goal._id}
                    goal={goal}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    />
                ))}
                </div>
            ) : (
                <p>No goals available.</p>
            )}
            {editedGoal && (
                <EditGoalForm
                editedGoal={editedGoal}
                onUpdate={handleUpdate}
                onCancel={() => setEditedGoal(null)}
                />
            )}
        </div> 
    )
}

export default page




