import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import session from "express-session";
import connectDB from './config/db.js';
import apiRouter from './routes/api.js';
import authRouter from './routes/auth.js';

// Connect to the database
connectDB();

const corsOptions = {
    origin: ['http://localhost:5173'], // Allow only this origin
    credentials: true,
};

const sessionStore = new session.MemoryStore();
const app = express(); // Create an instance of the Express application
const PORT = process.env.PORT || 3000; // Define the port to listen on

app.use(cors(corsOptions)); // Enable CORS for all incoming requests
app.use(
    session({
        store: sessionStore,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Set to true if using HTTPS
            sameSite: 'lax',
            httpOnly: true
        }
    })
);
app.use(express.json()); // Parse JSON request bodies

// Sample route for text response
app.get('/', (req, res) => {
    res.send('Hello, World!'); // Respond with a simple text message
});

// Use the routers
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});