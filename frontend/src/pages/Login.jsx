import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${config.API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {

                localStorage.setItem('user', JSON.stringify(data));
                window.location.href = '/';
            } else {
                alert(data.msg);
            }
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <main>
            <Breadcrumb title="Login" paths={[{ name: 'Pages', url: '#' }, { name: 'Login', url: '/login' }]} />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4 text-primary">Login</h2>
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control rounded-pill py-2 px-3"
                                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input type="password" className="form-control rounded-pill py-2 px-3"
                                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 rounded-pill py-3">Login</button>
                                </form>
                                <div className="text-center mt-3">
                                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
