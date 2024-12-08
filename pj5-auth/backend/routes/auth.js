import express from 'express';
import { registerUser  } from '../app/controllers/UserController.js';
import { loginUser  } from '../app/controllers/UserController.js';
import { logoutUser  } from '../app/controllers/UserController.js';

const router = express.Router();

// GET route to retrieve user information (example)
router.get('/users', (req, res) => {
    // Logic to retrieve users
    res.json({ message: "This would return user data." });
});
router.get('/login', (req, res) => {
    // Logic to retrieve users
    res.json({ message: "This would return login data." });
});
const checkLogin = ((req, res, next) => {
    if (!req.session.user_id) { //Make sure the session name "user_id" is matching the name in your login function
        console.log('Unauthorized');
        res.status(401).send('Please Login.');
    } else {
        console.log(req.session.username+" authorized.");
        next();
    }
})

router.post('/users', registerUser );
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;