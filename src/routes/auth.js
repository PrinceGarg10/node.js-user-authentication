const express = require('express');
const router = express.Router();
const loginUser = require('../services/auth');
const { validateLogin } = require('../validators/authValidator')


// POST /users
router.post('/login', validateLogin, async (req, res) => {
    try {
        const { contact, password } = req.body;
        const user = await loginUser(contact, password);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});;

module.exports = router;
