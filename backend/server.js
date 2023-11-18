const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const goalsRouter = require('./routes/goalsRoute')
const usersRouter = require('./routes/usersRoutes')
require('dotenv').config();

// Create an express app
const app = express();

const dbURI = process.env.MONGODB_URI 
const PORT = process.env.PORT

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connects the backend and frontend
app.use(cors())

// Allows us to read json object
app.use(express.json())

// Allow access to read form 
app.use(express.urlencoded({ extended: false }))

// Allows us to register all routes and sets API route point
app.use('/api/goals', goalsRouter)
app.use('/api/users', usersRouter)

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to the database');
})
.catch((error) => {
    console.error('Error connecting to the database', error);
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

