import express from 'express';
import cors from 'cors';
import taskTypes from './data/taskTypes.json' assert { type: 'json' }; // Import JSON data
import tasks from './data/tasks.json' assert { type: 'json' }; // Import JSON data

const app = express(); // Create an instance of the Express application
const PORT = process.env.PORT || 3000; // Define the port to listen on

app.use(cors()); // Enable CORS for all incoming requests

app.use(express.json()); // Parse JSON request bodies

// Sample route for text response
app.get('/', (req, res) => {
    res.send('Hello, World!'); // Respond with a simple text message
});

// Routes to serve the imported JSON response
app.get('/api/task-types', (req, res) => {
    res.json(taskTypes); // Respond with the imported JSON object
});

app.get('/api/tasks', (req, res) => {
   res.json(tasks); // Respond with the imported JSON object
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});