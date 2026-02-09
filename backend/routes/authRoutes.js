const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            phone,
            address,
            notifications: [{
                message: 'Welcome to Electro! Happy Shopping.',
                date: new Date()
            }]
        });

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (user.password !== password) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('wishlist');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/:id/wishlist', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { productId } = req.body;

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }
        res.json(user.wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id/wishlist/:productId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { productId } = req.params;

        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        await user.save();
        res.json(user.wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
