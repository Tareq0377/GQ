const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});