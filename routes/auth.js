const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
    registerValidation,
    loginValidation,
} = require('../helpers/dataValidation');

// Register
router.post('/register', async (req, res) => {
    // Validate the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if email already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).json({ error: 'Email already exists' });

    // Create a hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send({ userId: savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    // Validate the data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ error: 'Email or Password wrong' });

    // Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).json({ error: 'Email or Password wrong' });

    // Create and return token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({ token: token, type: 'Bearer' });
});

module.exports = router;
