const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const authMiddleware = require('../middleware/auth/auth');
const { validateUserRegistration } = require("../validators/userValidator")


// GET /users
router.get('/all', authMiddleware, async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /users
router.post('/', validateUserRegistration, async (req, res) => {
    try {
        // const { name, lastName } = req.body;
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /users/:id
router.patch('/', async (req, res) => {
    try {
        const { id, ...data } = req.body;
        const user = await userService.updateUser(id, data);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /users/:id
router.delete('/', async (req, res) => {
    try {
        const { id } = req.query;
        await userService.deleteUser(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
