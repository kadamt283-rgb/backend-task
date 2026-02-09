import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                window.location.href = '/login';
                return;
            }

            try {
                const res = await fetch(`${config.API_BASE_URL}/api/auth/${user._id}`);
                const data = await res.json();
                if (data.wishlist) {
                    setWishlist(data.wishlist);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchWishlist();
    }, []);

    return (
        <main>
            <Breadcrumb title="Wishlist" paths={[{ name: 'Pages', url: '#' }, { name: 'Wishlist', url: '/wishlist' }]} />
            <div className="container py-5">
                <div className="row g-4 justify-content-center">
                    {loading ? (
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : wishlist.length > 0 ? (
                        wishlist.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                isWishlist={true}
                                onRemove={(id) => setWishlist(prev => prev.filter(p => p._id !== id))}
                            />
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <h4 className="mb-4">Your wishlist is empty.</h4>
                            <Link to="/shop" className="btn btn-primary rounded-pill py-3 px-5">
                                <i className="fas fa-shopping-bag me-2"></i> Continue Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Wishlist;
