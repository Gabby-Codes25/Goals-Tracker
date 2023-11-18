const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema structure/ instance
const goalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

// export the schema
module.exports = mongoose.model('Goals', goalSchema)