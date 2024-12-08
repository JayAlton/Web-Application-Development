import User from '../models/User.js'; // Adjust the path as necessary
import argon2 from 'argon2'; // For password hashing

// Function to register a new user
export const registerUser  = async (req, res) => {
    const { user_name, password} = req.body;

    // Validate input
    if (!user_name || !password ) {
        return res.status(400).send("All fields are required.");
    }

    // Check if the username already exists
    const existingUser  = await User.findOne({ user_name });
    if (existingUser ) {
        return res.status(400).send("Username already exists.");
    }

    // Hash the password before saving
    try {
        const hashedPassword = await argon2.hash(password);

        // Create a new user
        const newUser  = new User({
            user_name,
            password: hashedPassword
        });

        await newUser .save();
        res.status(201).send({ user: newUser  });
    } catch (error) {
        res.status(500).send("Error creating user: " + error.message);
    }
};

// Function to log in a user
export const loginUser  = async (req, res) => {
    const { user_name, password } = req.body;

    // Validate input
    if (!user_name || !password) {
        return res.status(400).send("Username and password are required.");
    }

    // Find the user by username
    const user = await User.findOne({ user_name });
    if (!user) {
        return res.status(401).send("Invalid username or password.");
    }

    // Compare the provided password with the hashed password
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
        return res.status(401).send("Invalid username or password.");
    }

    // Send response with user data
    res.status(200).send({ user: { user_name: user.user_name} });
};

// Function to log out a user
export const logoutUser  = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Error logging out.");
        }
        res.status(200).send("Logged out successfully.");
    });
};