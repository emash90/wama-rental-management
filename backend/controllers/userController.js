const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = await User.findOne({ email });

            if (user) return res.status(400).json({ msg: "The email already exists." });

            if (password.length < 6)
                return res.status(400).json({ msg: "Password should be at least 6 characters long." });

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({
                name, email, password: passwordHash
            });

            // Save mongodb
            await newUser.save();
            return res.status(201).json({
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    avatar: newUser.avatar
                },
                msg: "Register Success!"
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: "User does not exist." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

            // If login success , create token
            const payload = { id: user._id, name: user.name };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });

            res.json({ token });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

module.exports = userController;