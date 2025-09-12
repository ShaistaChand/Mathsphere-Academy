// Main router that combines all routes

import express from 'express';
import dotenv from 'dotenv'; // to access environment variables

// require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('Mathsphere backend server is ready!');
});

// routes

app.get ('/api/v1/contacts', (req, res) => {
    // res.send('Get all contacts');

     // 1. Query database for contacts (e.g., MongoDB)
  // 2. Send actual data as JSON
  
  const newQuery = [
    { id: 1, name: "Alice", email: "alice@xyz.com", phone: "123-456-7890"},
    { id: 2, name: "Bob", email: "bob@abc.com", phone: "098-765-4321"  }
  ];
    res.json(newQuery); // Sends JSON with auto 'Content-Type: application/json'
});

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on port ${5000}`)});