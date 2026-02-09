const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/electro_mern')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.log('MongoDB Connection Error:', err));

const products = [

    {
        name: 'Smart Camera',
        description: 'Find The Best Camera for You! 40% Off',
        price: 899.99,
        category: 'Camera',
        image: '/img/product-1.png',
        stock: 15,
        rating: 5,
        numReviews: 12,
        badge: 'sale',
        isFeatured: true,
        isNewArrival: false,
        isTopSelling: true
    },
    {
        name: 'Smart Watch',
        description: 'Find The Best Watches for You! 20% Off',
        price: 299.99,
        category: 'Watch',
        image: '/img/product-2.png',
        stock: 20,
        rating: 4,
        numReviews: 8,
        badge: 'new',
        isFeatured: true,
        isNewArrival: true,
        isTopSelling: true
    },
    {
        name: 'Apple iPad Mini G2356',
        description: 'Latest Apple iPad Mini with powerful features',
        price: 1050.00,
        category: 'SmartPhone',
        image: '/img/product-3.png',
        stock: 10,
        rating: 5,
        numReviews: 12,
        badge: 'new',
        isFeatured: false,
        isNewArrival: true,
        isTopSelling: true
    },
    {
        name: 'SmartPhone G2356',
        description: 'Premium Android smartphone',
        price: 1050.00,
        category: 'SmartPhone',
        image: '/img/product-4.png',
        stock: 20,
        rating: 5,
        numReviews: 35,
        badge: 'sale',
        isFeatured: true,
        isNewArrival: false,
        isTopSelling: true
    },
    {
        name: 'SmartPhone z2356',
        description: 'Latest smartphone technology',
        price: 1050.00,
        category: 'SmartPhone',
        image: '/img/product-5.png',
        stock: 25,
        rating: 5,
        numReviews: 89,
        badge: 'featured',
        isFeatured: true,
        isNewArrival: true,
        isTopSelling: true
    },
    {
        name: 'SmartPhone M2356',
        description: 'High performance smartphone',
        price: 1050.00,
        category: 'SmartPhone',
        image: '/img/product-6.png',
        stock: 50,
        rating: 4,
        numReviews: 67,
        isFeatured: false,
        isNewArrival: true,
        isTopSelling: true
    },
    {
        name: 'SmartPhone A2356',
        description: 'Advanced smartphone features',
        price: 1050.00,
        category: 'SmartPhone',
        image: '/img/product-7.png',
        stock: 30,
        rating: 5,
        numReviews: 42,
        badge: 'sale',
        isFeatured: true,
        isNewArrival: false,
        isTopSelling: true
    },
    {
        name: 'SmartPhone K2356',
        description: 'Reliable smartphone choice',
        price: 1050.00,
        category: 'SmartPhone',
        image: '/img/product-8.png',
        stock: 100,
        rating: 4,
        numReviews: 156,
        isFeatured: false,
        isNewArrival: false,
        isTopSelling: true
    },
    {
        name: 'SmartPhone T2356',
        description: 'Top tier smartphone',
        price: 1050.00,
        category: 'SmartPhone',
        image: '/img/product-9.png',
        stock: 40,
        rating: 4,
        numReviews: 93,
        badge: 'new',
        isFeatured: false,
        isNewArrival: true,
        isTopSelling: true
    },
    {
        name: 'SmartPhone S2356',
        description: 'Sleek design smartphone',
        price: 1050.00,
        category: 'SmartPhone',
        image: '/img/product-10.png',
        stock: 35,
        rating: 5,
        numReviews: 78,
        badge: 'sale',
        isFeatured: true,
        isNewArrival: false,
        isTopSelling: true
    },
    {
        name: 'Laptop Pro X1',
        description: 'High performance laptop for professionals',
        price: 1299.99,
        category: 'Laptop',
        image: '/img/product-11.png',
        stock: 15,
        rating: 5,
        numReviews: 45,
        badge: 'new',
        isFeatured: true,
        isNewArrival: true,
        isTopSelling: true
    },
    {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling headphones',
        price: 249.99,
        category: 'Audio',
        image: '/img/product-12.png',
        stock: 40,
        rating: 4,
        numReviews: 67,
        badge: 'sale',
        isFeatured: true,
        isNewArrival: false,
        isTopSelling: true
    }
];


const seedDB = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
