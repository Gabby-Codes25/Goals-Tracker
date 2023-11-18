const express = require('express');
const router = express.Router();
const {
    getGoal,
    getSingleGoal,
    createGoal,
    deleteGoal,
    updateGoal
} = require('../controllers/goalController')

// Get all the blog
router.get('/', getGoal)

// Gets a single blog 
router.get('/:id', getSingleGoal)

// Creates a new blog
router.post('/', createGoal)

// Delete  a single blog
router.delete('/:id', deleteGoal)

// Update  a single blog
router.put('/:id', updateGoal)

module.exports = router