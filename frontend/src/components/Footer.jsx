import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>

            <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
                <div className="container py-5">
                    <div className="row g-4 mb-5 border-bottom pb-5">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="rounded p-4">
                                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: '70px', height: '70px' }}>
                                    <i className="fa fa-map-marker-alt fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h4 className="text-white">Address</h4>
                                    <p className="mb-2 text-white">123 Street, New York, USA</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="rounded p-4">
                                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: '70px', height: '70px' }}>
                                    <i className="fa fa-envelope fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h4 className="text-white">Mail Us</h4>
                                    <p className="mb-2 text-white">info@example.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="rounded p-4">
                                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: '70px', height: '70px' }}>
                                    <i className="fa fa-phone-alt fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h4 className="text-white">Telephone</h4>
                                    <p className="mb-2 text-white"><a href="tel:9112626380" className="text-white">9112626380</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="rounded p-4">
                                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: '70px', height: '70px' }}>
                                    <i className="fab fa-firefox-browser fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h4 className="text-white">Yoursite@ex.com</h4>
                                    <p className="mb-2 text-white"><a href="tel:9112626380" className="text-white">9112626380</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <div className="footer-item">
                                    <h4 className="text-primary mb-4">Newsletter</h4>
                                    <p className="mb-3 text-white">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit consectetur adipiscing elit.</p>
                                    <div className="position-relative mx-auto rounded-pill">
                                        <input className="form-control rounded-pill w-100 py-3 ps-4 pe-5" type="text"
                                            placeholder="Enter your email" />
                                        <button type="button"
                                            className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2">SignUp</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-primary mb-4">Customer Service</h4>
                                <Link to="/contact" className="text-white"><i className="fas fa-angle-right me-2"></i> Contact Us</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> Returns</Link>
                                <Link to="/account" className="text-white"><i className="fas fa-angle-right me-2"></i> Order History</Link>
                                <Link to="/shop" className="text-white"><i className="fas fa-angle-right me-2"></i> Site Map</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> Testimonials</Link>
                                <Link to="/account" className="text-white"><i className="fas fa-angle-right me-2"></i> My Account</Link>
                                <Link to="/notifications" className="text-white"><i className="fas fa-angle-right me-2"></i> Unsubscribe Notification</Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-primary mb-4">Information</h4>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> About Us</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> Delivery infomation</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> Privacy Policy</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> Terms & Conditions</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> Warranty</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> FAQ</Link>
                                <Link to="/admin" className="text-white"><i className="fas fa-angle-right me-2"></i> Seller Login</Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-primary mb-4">Extras</h4>
                                <Link to="/shop" className="text-white"><i className="fas fa-angle-right me-2"></i> Brands</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> Gift Vouchers</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> Affiliates</Link>
                                <Link to="/wishlist" className="text-white"><i className="fas fa-angle-right me-2"></i> Wishlist</Link>
                                <Link to="/account" className="text-white"><i className="fas fa-angle-right me-2"></i> Order History</Link>
                                <Link to="/debug" className="text-white"><i className="fas fa-angle-right me-2"></i> Track Your Order</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container-fluid copyright py-4">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-md-0">
                            <span className="text-white"><a href="#" className="border-bottom text-white"><i
                                className="fas fa-copyright text-light me-2"></i>Your Site Name</a>, All right
                                reserved.</span>
                        </div>
                        <div className="col-md-6 text-center text-md-end text-white">
                            Designed By <a className="border-bottom text-white" href="https://htmlcodex.com">HTML Codex</a>.
                            Distributed By <a className="border-bottom text-white" href="https://themewagon.com">ThemeWagon</a>
                        </div>
                    </div>
                </div>
            </div>


            <a href="#" className="btn btn-primary btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        </>
    );
};

export default Footer;
