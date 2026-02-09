const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');


const getCart = async () => {
    let cart = await Cart.findOne();
    if (!cart) {
        cart = new Cart({ items: [] });
        await cart.save();
    }
    return cart;
};


router.get('/', async (req, res) => {
    try {
        const cart = await getCart();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/add', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await getCart();
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

        if (itemIndex > -1) {

            cart.items[itemIndex].quantity += quantity || 1;
        } else {
            
            cart.items.push({
                product: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity || 1
            });
        }
        cart.updatedAt = Date.now();
        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/update/:productId', async (req, res) => {
    const { quantity } = req.body;
    try {
        let cart = await getCart();
        const itemIndex = cart.items.findIndex(p => p.product.toString() === req.params.productId); 

 

        let foundIndex = -1;
        foundIndex = cart.items.findIndex(p => p.product.toString() === req.params.productId);

        if (foundIndex === -1) {
            foundIndex = cart.items.findIndex(p => p._id.toString() === req.params.productId);
        }

        if (foundIndex > -1) {
            cart.items[foundIndex].quantity = quantity;
            cart.updatedAt = Date.now();
            await cart.save();
            return res.json(cart);
        }

        res.status(404).json({ msg: 'Item not found in cart' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.delete('/remove/:productId', async (req, res) => {
    try {
        let cart = await getCart();
       
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item =>
            item.product.toString() !== req.params.productId &&
            item._id.toString() !== req.params.productId
        );

        cart.updatedAt = Date.now();
        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
