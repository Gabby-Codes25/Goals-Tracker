const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // The 'name' field is required
    },
    email: {
        type: String,
        required: true, // The 'email' field is required
        unique: true, // Each email should be unique
    },
    password: {
        type: String,
        required: true, // The 'password' field is required
    },
});

// Creating a Mongoose model named 'Users' based on the userSchema
module.exports = mongoose.model('Users', userSchema);
