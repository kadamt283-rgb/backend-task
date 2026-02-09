import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const MyAccount = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser); 
        } else {
            window.location.href = '/login';
        }
    }, []);

    if (!user) return null;

    return (
        <main>
            <Breadcrumb title="My Account" paths={[{ name: 'Pages', url: '#' }, { name: 'My Account', url: '/account' }]} />
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm text-center p-4">
                            <img src="/img/avatar.jpg" className="img-fluid rounded-circle mx-auto mb-3" style={{ width: '150px' }} alt="Profile" />
                            <h3>{user.name}</h3>
                            <p className="text-muted">{user.email}</p>
                            <button className="btn btn-primary rounded-pill btn-sm"
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    window.location.href = '/login';
                                }}
                            >Log Out</button>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm p-4">
                            <h4 className="mb-4 text-primary">Account Details</h4>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>Phone:</strong> <p>{user.phone || 'N/A'}</p>
                                </div>
                                <div className="col-md-6">
                                    <strong>Address:</strong> <p>{user.address || 'N/A'}</p>
                                </div>
                            </div>

                            <h4 className="mt-4 text-primary">My Orders</h4>
                            <p>No orders yet.</p>
                           
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MyAccount;
