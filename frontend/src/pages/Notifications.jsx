import React, { useEffect, useState } from 'react';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                window.location.href = '/login';
                return;
            }

            try {
                const res = await fetch(`${config.API_BASE_URL}/api/auth/${user._id}`);
                const data = await res.json();
                if (data.notifications) {
                    setNotifications(data.notifications);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <main>
            <Breadcrumb title="Notifications" paths={[{ name: 'Pages', url: '#' }, { name: 'Notifications', url: '/notifications' }]} />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="mb-4">Your Notifications</h2>
                        {loading ? (
                            <div className="text-center"><div className="spinner-border text-primary"></div></div>
                        ) : notifications.length > 0 ? (
                            <div className="list-group">
                                {notifications.map((note, index) => (
                                    <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="mb-1">{note.message}</p>
                                            <small className="text-muted">{new Date(note.date).toLocaleDateString()}</small>
                                        </div>
                                        <i className="fas fa-bell text-warning"></i>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No new notifications.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Notifications;
