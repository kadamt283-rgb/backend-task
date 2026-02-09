const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    badge: { type: String, enum: ['new', 'sale', 'featured', ''], default: '' },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isTopSelling: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
