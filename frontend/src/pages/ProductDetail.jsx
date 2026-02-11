import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${config.API_BASE_URL}/api/products/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };
        fetchProduct();

        if (window.WOW) {
            new window.WOW().init();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container-fluid py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container-fluid py-5 text-center">
                <h1>Product Not Found</h1>
            </div>
        );
    }

    return (
        <main>
            <Breadcrumb title="Product Details" paths={[{ name: 'Pages', url: '#' }, { name: 'Product Details', url: `/product/${id}` }]} />

            <div className="container-fluid shop py-5">
                <div className="container py-5">
                    <div className="row g-4">

                        <div className="col-lg-5 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="product-categories mb-4">
                                <h4>Products Categories</h4>
                                <ul className="list-unstyled">
                                    <li><div className="categories-item"><a href="#" className="text-dark"><i className="fas fa-apple-alt text-secondary me-2"></i>Accessories</a></div></li>
                                    <li><div className="categories-item"><a href="#" className="text-dark"><i className="fas fa-apple-alt text-secondary me-2"></i>Electronics</a></div></li>
                                    <li><div className="categories-item"><a href="#" className="text-dark"><i className="fas fa-apple-alt text-secondary me-2"></i>Laptops</a></div></li>
                                </ul>
                            </div>
                            <div className="featured-product mb-4">
                                <h4 className="mb-3">Featured products</h4>

                                <div className="featured-product-item d-flex align-items-center mb-3">
                                    <div className="rounded me-4" style={{ width: '100px', height: '100px' }}>
                                        <img src="/img/product-3.png" className="img-fluid rounded" alt="Featured" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">SmartPhone</h6>
                                        <h5 className="fw-bold">$1050.00</h5>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-7 col-xl-9 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="row g-4 single-product">
                                <div className="col-xl-6">
                                    <div className="bg-light rounded text-center p-5">
                                        <img src={product.image || "/img/product-4.png"} className="img-fluid rounded" alt={product.name} />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <h4 className="fw-bold mb-3">{product.name}</h4>
                                    <p className="mb-3">Category: {product.category}</p>
                                    <h5 className="fw-bold mb-3">${product.price}</h5>
                                    <div className="d-flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`fa fa-star ${i < 4 ? 'text-secondary' : ''}`}></i>
                                        ))}
                                    </div>
                                    <p className="mb-4">{product.description}</p>
                                    <div className="input-group quantity mb-5" style={{ width: '120px' }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control form-control-sm text-center border-0" value={quantity} readOnly />
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => setQuantity(quantity + 1)}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary border border-secondary rounded-pill px-4 py-2 mb-4">
                                        <i className="fa fa-shopping-bag me-2"></i> Add to cart
                                    </button>
                                </div>

                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button
                                                className={`nav-link border-white border-bottom-0 ${activeTab === 'description' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('description')}
                                            >
                                                Description
                                            </button>
                                            <button
                                                className={`nav-link border-white border-bottom-0 ${activeTab === 'reviews' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('reviews')}
                                            >
                                                Reviews
                                            </button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        {activeTab === 'description' ? (
                                            <div className="tab-pane active">
                                                <p>{product.description}</p>
                                                <p>Additional details about the product could go here. This is a placeholder for the extended description section of the Electro template.</p>
                                            </div>
                                        ) : (
                                            <div className="tab-pane active">
                                                <div className="d-flex mb-4">
                                                    <img src="/img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: '100px', height: '100px' }} alt="Avatar" />
                                                    <div>
                                                        <p className="mb-0" style={{ fontSize: '14px' }}>April 12, 2024</p>
                                                        <div className="d-flex justify-content-between">
                                                            <h5>Jason Smith</h5>
                                                            <div className="d-flex mb-3">
                                                                <i className="fa fa-star text-secondary"></i>
                                                                <i className="fa fa-star text-secondary"></i>
                                                                <i className="fa fa-star text-secondary"></i>
                                                                <i className="fa fa-star text-secondary"></i>
                                                                <i className="fa fa-star"></i>
                                                            </div>
                                                        </div>
                                                        <p>Great product! Highly recommended.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <form>
                                    <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="text" className="form-control border-0" placeholder="Your Name *" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="email" className="form-control border-0" placeholder="Your Email *" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="border-bottom rounded my-4">
                                                <textarea className="form-control border-0" cols="30" rows="8" placeholder="Your Review *"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between py-3 mb-5">
                                                <button type="submit" className="btn btn-primary border border-secondary rounded-pill px-4 py-3">Post Comment</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
