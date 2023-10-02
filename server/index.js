const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

const restaurantRoutes = require('./routes');
app.use('/', restaurantRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
