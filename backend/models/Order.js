const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    guestInfo: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        country: String,
        zip: String
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            price: Number,
            quantity: Number,
            image: String
        }
    ],
    shippingPrice: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        default: 'Check Payments'
    },
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
