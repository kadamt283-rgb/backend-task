const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
