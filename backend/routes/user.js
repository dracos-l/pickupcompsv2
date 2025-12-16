const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Attempt = require('../models/Attempt');

// @route   GET api/user
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/user/attempt
// @desc    Save a quiz attempt
// @access  Private
router.post('/attempt', auth, async (req, res) => {
    try {
        const newAttempt = new Attempt({
            user: req.user.id,
            result: req.body.result
        });

        const attempt = await newAttempt.save();
        res.json(attempt);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/user/attempts
// @desc    Get user attempts
// @access  Private
router.get('/attempts', auth, async (req, res) => {
    try {
        const attempts = await Attempt.find({ user: req.user.id }).sort({ date: -1 });
        res.json(attempts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
