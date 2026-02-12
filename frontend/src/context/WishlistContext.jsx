import React, { createContext, useContext, useState, useEffect } from 'react';
import config from '../config';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistCount, setWishlistCount] = useState(0);

    const fetchWishlistCount = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        try {
            const res = await fetch(`${config.API_BASE_URL}/api/auth/${user._id}`);
            const data = await res.json();
            if (data.wishlist) {
                setWishlistCount(data.wishlist.length);
            }
        } catch (err) {
            console.error('Error fetching wishlist count:', err);
        }
    };

    const addToWishlist = async (productId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please login to add items to wishlist');
            return;
        }

        try {
            const res = await fetch(`${config.API_BASE_URL}/api/auth/${user._id}/wishlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });
            const data = await res.json();
            if (data) {
                setWishlistCount(data.length);
                alert('Product added to wishlist!');
            }
        } catch (err) {
            console.error('Error adding to wishlist:', err);
            alert('Failed to add to wishlist');
        }
    };

    const removeFromWishlist = async (productId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        try {
            const res = await fetch(`${config.API_BASE_URL}/api/auth/${user._id}/wishlist/${productId}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data) {
                setWishlistCount(data.length);
            }
        } catch (err) {
            console.error('Error removing from wishlist:', err);
            alert('Failed to remove from wishlist');
        }
    };

    useEffect(() => {
        fetchWishlistCount();
    }, []);

    return (
        <WishlistContext.Provider value={{ wishlistCount, addToWishlist, removeFromWishlist, fetchWishlistCount }}>
            {children}
        </WishlistContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);
