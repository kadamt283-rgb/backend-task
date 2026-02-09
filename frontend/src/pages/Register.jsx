import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', address: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${config.API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                alert('Registration Successful! Please Login.');
                navigate('/login');
            } else {
                alert(data.msg);
            }
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <main>
            <Breadcrumb title="Register" paths={[{ name: 'Pages', url: '#' }, { name: 'Register', url: '/register' }]} />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4 text-primary">Create Account</h2>
                                <form onSubmit={handleRegister}>
                                    <div className="mb-3">
                                        <label>Full Name</label>
                                        <input type="text" name="name" className="form-control rounded-pill"
                                            onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Email Address</label>
                                        <input type="email" name="email" className="form-control rounded-pill"
                                            onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" className="form-control rounded-pill"
                                            onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Phone</label>
                                        <input type="text" name="phone" className="form-control rounded-pill"
                                            onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Address</label>
                                        <textarea name="address" className="form-control rounded"
                                            onChange={handleChange}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 rounded-pill py-3">Register</button>
                                </form>
                                <div className="text-center mt-3">
                                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;
