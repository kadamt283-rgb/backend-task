import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await fetch(`${config.API_BASE_URL}/api/cart`);
            const data = await res.json();

            if (data && data.items) {
                setCartItems(data.items);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();

        if (window.WOW) {
            new window.WOW().init();
        }
    }, []);

    const updateQuantity = async (productId, delta, currentQuantity) => {
        const newQuantity = currentQuantity + delta;
        if (newQuantity < 1) return;

        try {
            const updatedItems = cartItems.map(item =>
                (item.product === productId || item._id === productId) ? { ...item, quantity: newQuantity } : item
            );
            setCartItems(updatedItems);

            await fetch(`${config.API_BASE_URL}/api/cart/update/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: newQuantity })
            });
        } catch (error) {
            console.error('Error updating quantity:', error);
            fetchCart();
        }
    };

    const removeItem = async (productId) => {
        try {

            setCartItems(cartItems.filter(item => item.product !== productId && item._id !== productId));

            await fetch(`${config.API_BASE_URL}/api/cart/remove/${productId}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error removing item:', error);
            fetchCart();
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 3.00;
    const total = subtotal + shipping;

    if (loading) return <div className="text-center py-5">Loading Cart...</div>;

    return (
        <main>
            <Breadcrumb title="Cart Page" paths={[{ name: 'Pages', url: '#' }, { name: 'Cart Page', url: '/cart' }]} />

            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length === 0 ? (
                                    <tr><td colSpan="6" className="text-center">Your cart is empty</td></tr>
                                ) : (
                                    cartItems.map(item => (
                                        <tr key={item._id || item.product}>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={item.image} className="img-fluid me-5 rounded-circle" style={{ width: '80px', height: '80px' }} alt="" />
                                                </div>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{item.name}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">${item.price}</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: '100px' }}>
                                                    <div className="input-group-btn">
                                                        <button
                                                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                                                            onClick={() => updateQuantity(item.product, -1, item.quantity)}
                                                        >
                                                            <i className="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input type="text" className="form-control form-control-sm text-center border-0"
                                                        value={item.quantity} readOnly />
                                                    <div className="input-group-btn">
                                                        <button
                                                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                            onClick={() => updateQuantity(item.product, 1, item.quantity)}
                                                        >
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">${(item.price * item.quantity).toFixed(2)}</p>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-md rounded-circle bg-light border mt-4"
                                                    onClick={() => removeItem(item.product)}
                                                >
                                                    <i className="fa fa-times text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5">
                        <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
                        <button className="btn btn-primary rounded-pill px-4 py-3" type="button">Apply Coupon</button>
                    </div>

                    <div className="row g-4 justify-content-end">
                        <div className="col-8"></div>
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${subtotal.toFixed(2)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div>
                                            <p className="mb-0">Flat rate: ${shipping.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to USA.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${total.toFixed(2)}</p>
                                </div>
                                <Link to="/checkout" className="btn btn-primary rounded-pill px-4 py-3 text-uppercase mb-4 ms-4">Proceed Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;
