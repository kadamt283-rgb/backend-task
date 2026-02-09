import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const DebugPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('DebugPage: Starting to fetch products...');

        axios.get(`${config.API_BASE_URL}/api/products`)
            .then(res => {
                console.log('DebugPage: Products fetched successfully:', res.data);
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('DebugPage: Error fetching products:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Debug Page - Product Display Test</h1>

            {loading && <p>Loading products...</p>}

            {error && (
                <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
                    <h2>Error:</h2>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div>
                    <h2>Products Found: {products.length}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        {products.map(product => (
                            <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        console.error('Image failed to load:', product.image);
                                        e.target.src = 'https://via.placeholder.com/200';
                                    }}
                                />
                                <h3>{product.name}</h3>
                                <p>Category: {product.category}</p>
                                <p>Price: ${product.price}</p>
                                {product.badge && <span style={{
                                    background: product.badge === 'new' ? 'green' : product.badge === 'sale' ? 'red' : 'blue',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '3px'
                                }}>{product.badge}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DebugPage;
