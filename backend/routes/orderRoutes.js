const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

router.post('/', async (req, res) => {
    try {
        const { guestInfo, items, totalAmount, shippingPrice } = req.body;

    
        const newOrder = new Order({
            guestInfo,
            items,
            totalAmount,
            shippingPrice
        });

        const order = await newOrder.save();

        
        await Cart.deleteMany({}); 
        
        await Cart.updateMany({}, { $set: { items: [] } });

        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
