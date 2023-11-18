const mongoose = require('mongoose');
const Goal = require('../models/goalsModel');

const getGoal = async (req, res) => {
    try {
      // Find all goals in the database and sort by the created time in descending order
      const goals = await Goal.find({}).sort({ createdAt: -1 });
  
      // Check if there are no goals found
      if (!goals || goals.length === 0) {
        return res.status(404).json({ message: 'No goals found' });
      }
  
      // Send a successful response with the goals
      return res.status(200).json(goals);
    } catch (error) {
      // Log the error for debugging
      console.error('Error fetching goals:', error);
  
      // Handle different types of errors appropriately
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      // Handle other database-related errors
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const getSingleGoal = async (req, res) => {
    // Grab the id and store it in the params property
    const { id } = req.params;
  
    try {
      // Check if the id is not valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid goal ID format' });
      }
  
      // Find a goal by its ID
      const goal = await Goal.findById(id);
  
      // Check if the goal doesn't exist
      if (!goal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
  
      // Send a successful response with the goal
      res.status(200).json(goal);
    } catch (error) {
      // Log the error for debugging
      console.error('Error fetching single goal:', error);
  
      // Handle different types of errors appropriately
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid goal ID format' });
      }
  
      // Handle other database-related errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Create new goal
const createGoal = async (req, res) => {

    try {
        const { title, body } = req.body;
        const goal = new Goal({ title, body });
        // Save the goal to the database
        const savedGoal = await goal.save();

        // Send the status and a JSON response
        res.status(200).json(savedGoal);
        
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Internal Server Error' });
    }
};  
// Delete a goal
const deleteGoal = async (req, res) => {
    // Find the goal by id and set it to req params
    const { id } = req.params;
  
    try {
      // Check if the id is not valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid goal ID format' });
      }
  
      // Find the goal by ID and remove it
      const deletedGoal = await Goal.findByIdAndRemove(id);
  
      // Check if the goal doesn't exist
      if (!deletedGoal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
  
      // Send a successful response with the deleted goal's ID
      res.status(200).json({ id: deletedGoal._id });
    } catch (error) {
      // Log the error for debugging
      console.error('Error deleting goal:', error);
  
      // Handle different types of errors appropriately
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid goal ID format' });
      }
  
      // Handle other database-related errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
// Update a goal
const updateGoal = async (req, res) => {
    // Find the goal by id and set it to req params
    const { id } = req.params;
  
    try {
      // Check if the id is not valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid goal ID format' });
      }
  
      // Update the goal by ID
      const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
  
      // Check if the goal doesn't exist
      if (!updatedGoal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
  
      // Send a successful response with the updated goal
      res.status(200).json(updatedGoal);
    } catch (error) {
      // Log the error for debugging
      console.error('Error updating goal:', error);
  
      // Handle different types of errors appropriately
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation Error', details: error.errors });
      }
  
      // Handle other database-related errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Export the functions and require them in the routes file
module.exports = {
    getGoal,
    getSingleGoal,
    createGoal,
    deleteGoal,
    updateGoal,
};
