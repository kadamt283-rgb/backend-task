import React, { useEffect } from 'react';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';

const Checkout = () => {
    const [cartItems, setCartItems] = React.useState([]);
    const [formData, setFormData] = React.useState({
        firstName: '', lastName: '', address: '', city: '', country: '', zip: '', mobile: '', email: ''
    });
    const [status, setStatus] = React.useState('');

    const fetchCart = async () => {
        try {
            const res = await fetch(`${config.API_BASE_URL}/api/cart`);
            const data = await res.json();
            if (data && data.items) setCartItems(data.items);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
        if (window.WOW) {
            new window.WOW().init();
        }
    }, []);

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const placeOrder = async () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        if (!formData.firstName || !formData.mobile || !formData.address) {
            alert('Please fill in required fields');
            return;
        }

        setStatus('Placing Order...');
        try {
            const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) + 15; // + shipping

            const response = await fetch(`${config.API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    guestInfo: formData,
                    items: cartItems,
                    totalAmount: total,
                    shippingPrice: 15
                })
            });

            if (response.ok) {
                setStatus('ORDER PLACED SUCCESSFULLY!');
                setCartItems([]);
                alert('Success! Your order has been placed.');

                setFormData({ firstName: '', lastName: '', address: '', city: '', country: '', zip: '', mobile: '', email: '' });
            } else {
                setStatus('Failed to place order.');
            }
        } catch (error) {
            console.error(error);
            setStatus('Error processing order.');
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 15.00;
    const total = subtotal + shipping;

    return (
        <main>
            <Breadcrumb title="Checkout Page" paths={[{ name: 'Pages', url: '#' }, { name: 'Checkout', url: '/checkout' }]} />

            <div className="container-fluid bg-light overflow-hidden py-5">
                <div className="container py-5">
                    <h1 className="mb-4 wow fadeInUp" data-wow-delay="0.1s">Billing details</h1>
                    <form onSubmit={(e) => { e.preventDefault(); placeOrder(); }}>
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-6 wow fadeInUp" data-wow-delay="0.1s">

                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">First Name<sup>*</sup></label>
                                            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">Last Name</label>
                                            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Address <sup>*</sup></label>
                                    <input type="text" className="form-control" placeholder="House Number Street Name" name="address" value={formData.address} onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Town/City</label>
                                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Mobile<sup>*</sup></label>
                                    <input type="tel" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Email Address</label>
                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="form-check my-3">
                                    <input type="checkbox" className="form-check-input" id="Account-1" name="Accounts" value="Accounts" />
                                    <label className="form-check-label" htmlFor="Account-1">Create an account?</label>
                                </div>
                                <hr />
                                <div className="form-item">
                                    <textarea name="text" className="form-control" spellCheck="false" cols="30" rows="11"
                                        placeholder="Order Notes (Optional)"></textarea>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6 col-xl-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="col" className="text-start">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map(item => (
                                                <tr className="text-center" key={item._id || item.product}>
                                                    <th scope="row" className="text-start py-4">{item.name}</th>
                                                    <td className="py-4">${item.price}</td>
                                                    <td className="py-4 text-center">{item.quantity}</td>
                                                    <td className="py-4">${(item.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <th scope="row"></th>
                                                <td className="py-4"></td>
                                                <td className="py-4"><p className="mb-0 text-dark py-2">Subtotal</p></td>
                                                <td className="py-4">
                                                    <div className="py-2 text-center border-bottom border-top">
                                                        <p className="mb-0 text-dark">${subtotal.toFixed(2)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row"></th>
                                                <td className="py-4"><p className="mb-0 text-dark py-4">Shipping</p></td>
                                                <td colSpan="2" className="py-4">
                                                    <div className="form-check text-start">
                                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-2" name="Shipping-1" defaultChecked />
                                                        <label className="form-check-label" htmlFor="Shipping-2">Flat rate: ${shipping.toFixed(2)}</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row"></th>
                                                <td className="py-4"><p className="mb-0 text-dark text-uppercase py-2">TOTAL</p></td>
                                                <td className="py-4"></td>
                                                <td className="py-4">
                                                    <div className="py-2 text-center border-bottom border-top">
                                                        <p className="mb-0 text-dark">${total.toFixed(2)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                                    {status && <div className="alert alert-info">{status}</div>}
                                    <button type="button" onClick={placeOrder} className="btn btn-primary border-secondary py-3 px-4 text-uppercase w-100">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
