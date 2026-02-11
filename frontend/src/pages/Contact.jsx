import React, { useEffect } from 'react';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';

const Contact = () => {
    useEffect(() => {
        if (window.WOW) {
            new window.WOW().init();
        }
    }, []);

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = React.useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch(`${config.API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                setStatus('Failed to send message.');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error sending message.');
        }
    };

    return (
        <main>
            <Breadcrumb title="Contact Us" paths={[{ name: 'Pages', url: '#' }, { name: 'Contact', url: '/contact' }]} />
            {/* tushar */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '900px' }}>
                                    <h4 className="text-primary border-bottom border-primary border-2 d-inline-block pb-2">Get in touch</h4>
                                    <p className="mb-5 fs-5 text-dark">We are here for you! How can we help?</p>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <h5 className="text-primary wow fadeInUp" data-wow-delay="0.1s">Let’s Connect</h5>
                                <h1 className="display-5 mb-4 wow fadeInUp" data-wow-delay="0.3s">Send Your Message</h1>
                                <p className="mb-4 wow fadeInUp" data-wow-delay="0.5s">
                                    Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                                {status && <div className={`alert ${status.includes('success') ? 'alert-success' : 'alert-danger'}`}>{status}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="col-lg-12 col-xl-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-xl-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-xl-6">
                                            <div className="form-floating">
                                                <input type="tel" className="form-control" id="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                                                <label htmlFor="phone">Your Phone</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-xl-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                                                <label htmlFor="subject">Subject</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Leave a message here" id="message"
                                                    style={{ height: '160px' }} value={formData.message} onChange={handleChange} required></textarea>
                                                <label htmlFor="message">Message</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary w-100 py-3">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.2s">
                                <div className="h-100 rounded">
                                    <iframe className="rounded w-100" style={{ height: '100%', minHeight: '400px' }}
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                                        loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="row g-4 align-items-center justify-content-center">
                                    <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="rounded p-4">
                                            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                                style={{ width: '70px', height: '70px' }}>
                                                <i className="fas fa-map-marker-alt fa-2x text-primary"></i>
                                            </div>
                                            <div>
                                                <h4>Address</h4>
                                                <p className="mb-2">123 Street New York, USA</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.3s">
                                        <div className="rounded p-4">
                                            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                                style={{ width: '70px', height: '70px' }}>
                                                <i className="fas fa-envelope fa-2x text-primary"></i>
                                            </div>
                                            <div>
                                                <h4>Mail Us</h4>
                                                <p className="mb-2">info@example.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.5s">
                                        <div className="rounded p-4">
                                            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                                style={{ width: '70px', height: '70px' }}>
                                                <i className="fa fa-phone-alt fa-2x text-primary"></i>
                                            </div>
                                            <div>
                                                <h4>Telephone</h4>
                                                <p className="mb-2"><a href="tel:9112626380">9112626380</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.7s">
                                        <div className="rounded p-4">
                                            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                                style={{ width: '70px', height: '70px' }}>
                                                <i className="fab fa-firefox-browser fa-2x text-primary"></i>
                                            </div>
                                            <div>
                                                <h4>Website</h4>
                                                <p className="mb-2">www.example.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Contact;
