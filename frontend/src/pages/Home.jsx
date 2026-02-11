import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${config.API_BASE_URL}/api/products`);
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();

        if (window.WOW) {
            new window.WOW().init();
        }
        window.scrollTo(0, 1);
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);


    }, []);

    useEffect(() => {
        if (!loading && window.$ && window.$.fn.owlCarousel) {
            window.$(".owl-carousel").owlCarousel('destroy');
 
            window.$(".header-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1500,
                items: 1,
                dots: false,
                loop: true,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ]
            });

            window.$(".productList-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                margin: 24,
                dots: false,
                loop: true,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsive: {
                    0: {
                        items: 1
                    },
                    992: {
                        items: 2
                    }
                }
            });
            window.$(".testimonial-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                center: true,
                dots: true,
                loop: true,
                margin: 25,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });
        }
        if (window.WOW) {
            new window.WOW().init();
        }
    }, [loading, products]);

    const getNewArrivals = () => {
        return products.filter(p => p.isNewArrival);
    };

    const getFeatured = () => {
        return products.filter(p => p.isFeatured);
    };

    const getTopSelling = () => {
        return products.filter(p => p.isTopSelling);
    };

    return (
        <main>
            <div className="container-fluid carousel bg-light px-0">
                <div className="row g-0 justify-content-end">
                    <div className="col-12 col-lg-7 col-xl-9">
                        <div className="header-carousel owl-carousel bg-light py-5">
                            <div className="row g-0 header-carousel-item align-items-center">
                                <div className="col-xl-6 carousel-img wow fadeInLeft" data-wow-delay="0.1s">
                                    <img src="/img/carousel-1.png" className="img-fluid w-100" alt="Image" />
                                </div>
                                <div className="col-xl-6 carousel-content p-4">
                                    <h4 className="text-uppercase fw-bold mb-4 wow fadeInRight" data-wow-delay="0.1s"
                                        style={{ letterSpacing: '3px' }}>Save Up To A $400</h4>
                                    <h1 className="display-3 text-capitalize mb-4 wow fadeInRight" data-wow-delay="0.3s">On Selected
                                        Laptops & Desktop Or Smartphone</h1>
                                    <p className="text-dark wow fadeInRight" data-wow-delay="0.5s">Terms and Condition Apply</p>
                                    <Link className="btn btn-primary rounded-pill py-3 px-5 wow fadeInRight" data-wow-delay="0.7s"
                                        to="/shop">Shop Now</Link>
                                </div>
                            </div>
                            <div className="row g-0 header-carousel-item align-items-center">
                                <div className="col-xl-6 carousel-img wow fadeInLeft" data-wow-delay="0.1s">
                                    <img src="/img/carousel-2.png" className="img-fluid w-100" alt="Image" />
                                </div>
                                <div className="col-xl-6 carousel-content p-4">
                                    <h4 className="text-uppercase fw-bold mb-4 wow fadeInRight" data-wow-delay="0.1s"
                                        style={{ letterSpacing: '3px' }}>Save Up To A $200</h4>
                                    <h1 className="display-3 text-capitalize mb-4 wow fadeInRight" data-wow-delay="0.3s">On Selected
                                        Laptops & Desktop Or Smartphone</h1>
                                    <p className="text-dark wow fadeInRight" data-wow-delay="0.5s">Terms and Condition Apply</p>
                                    <Link className="btn btn-primary rounded-pill py-3 px-5 wow fadeInRight" data-wow-delay="0.7s"
                                        to="/shop">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 col-xl-3 wow fadeInRight" data-wow-delay="0.1s">
                        <div className="carousel-header-banner h-100">
                            <img src="/img/header-img.jpg" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} alt="Image" />
                            <div className="carousel-banner-offer">
                                <p className="bg-primary text-white rounded fs-5 py-2 px-4 mb-0 me-3">Save $48.00</p>
                                <p className="text-primary fs-5 fw-bold mb-0">Special Offer</p>
                            </div>
                            <div className="carousel-banner">
                                <div className="carousel-banner-content text-center p-4">
                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                    <a href="#" className="d-block text-white fs-3">Apple iPad Mini <br /> G2356</a>
                                    <del className="me-2 text-white fs-5">$1,250.00</del>
                                    <span className="text-primary fs-5">$1,050.00</span>
                                </div>
                                <a href="#" className="btn btn-primary rounded-pill py-2 px-4"><i
                                    className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid px-0">
                <div className="row g-0">
                    <div className="col-6 col-md-4 col-lg-2 border-start border-end wow fadeInUp" data-wow-delay="0.1s">
                        <div className="p-4">
                            <div className="d-inline-flex align-items-center">
                                <i className="fa fa-sync-alt fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Free Return</h6>
                                    <p className="mb-0">30 days money back guarantee!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.2s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fab fa-telegram-plane fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Free Shipping</h6>
                                    <p className="mb-0">Free shipping on all order</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.3s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-life-ring fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Support 24/7</h6>
                                    <p className="mb-0">We support online 24 hrs a day</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.4s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-credit-card fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Receive Gift Card</h6>
                                    <p className="mb-0">Recieve gift all over oder $50</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.5s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-lock fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Secure Payment</h6>
                                    <p className="mb-0">We Value Your Security</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.6s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-blog fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Online Service</h6>
                                    <p className="mb-0">Free return products in 30 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-light py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s">
                            <Link to="/shop" className="d-flex align-items-center justify-content-between border bg-white rounded p-4">
                                <div>
                                    <p className="text-muted mb-3">Find The Best Camera for You!</p>
                                    <h3 className="text-primary">Smart Camera</h3>
                                    <h1 className="display-3 text-secondary mb-0">40% <span
                                        className="text-primary fw-normal">Off</span></h1>
                                </div>
                                <img src={products.find(p => p.name === 'Smart Camera')?.image || "/img/product-1.png"}
                                    className="img-fluid text-center"
                                    style={{ maxHeight: '200px', width: 'auto' }}
                                    alt="Smart Camera" />
                            </Link>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.3s">
                            <Link to="/shop" className="d-flex align-items-center justify-content-between border bg-white rounded p-4">
                                <div>
                                    <p className="text-muted mb-3">Find The Best Watches for You!</p>
                                    <h3 className="text-primary">Smart Watch</h3>
                                    <h1 className="display-3 text-secondary mb-0">20% <span
                                        className="text-primary fw-normal">Off</span></h1>
                                </div>
                                <img src={products.find(p => p.name === 'Smart Watch')?.image || "/img/product-2.png"}
                                    className="img-fluid text-center"
                                    style={{ maxHeight: '200px', width: 'auto' }}
                                    alt="Smart Watch" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid product py-5">
                <div className="container py-5">
                    <div className="tab-class">
                        <div className="row g-4 justify-content-center">
                            <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                <h1>Our Products</h1>
                            </div>
                            <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item mb-4">
                                        <a className="d-flex mx-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill"
                                            href="#tab-1">
                                            <span className="text-dark" style={{ width: '130px' }}>All Products</span>
                                        </a>
                                    </li>
                                    <li className="nav-item mb-4">
                                        <a className="d-flex py-2 mx-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                            <span className="text-dark" style={{ width: '130px' }}>New Arrivals</span>
                                        </a>
                                    </li>
                                    <li className="nav-item mb-4">
                                        <a className="d-flex mx-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                            <span className="text-dark" style={{ width: '130px' }}>Featured</span>
                                        </a>
                                    </li>
                                    <li className="nav-item mb-4">
                                        <a className="d-flex mx-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                                            <span className="text-dark" style={{ width: '130px' }}>Top Selling</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    {loading ? (
                                        <div className="col-12 text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : products.length > 0 ? (
                                        products.map(product => (
                                            <ProductCard key={product._id} product={product} />
                                        ))
                                    ) : (
                                        <div className="col-12 text-center py-5">
                                            <h3>No products found in database.</h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div id="tab-2" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    {getNewArrivals().length > 0 ? getNewArrivals().map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    )) : (
                                        <div className="col-12 text-center py-5">
                                            <h3>No New Arrivals found.</h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div id="tab-3" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    {getFeatured().length > 0 ? getFeatured().map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    )) : (
                                        <div className="col-12 text-center py-5">
                                            <h3>No Featured products found.</h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div id="tab-4" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    {getTopSelling().length > 0 ? getTopSelling().map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    )) : (
                                        <div className="col-12 text-center py-5">
                                            <h3>No Top Selling products found.</h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.1s">
                            <Link to="/shop">
                                <div className="bg-primary rounded position-relative">
                                    <img src="/img/product-banner.jpg" className="img-fluid w-100 rounded" alt="" />
                                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center rounded p-4"
                                        style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                                        <h3 className="display-5 text-primary">EOS Rebel <br /> <span>T7i Kit</span></h3>
                                        <p className="fs-4 text-muted">$899.99</p>
                                        <span className="btn btn-primary rounded-pill align-self-start py-2 px-4">Shop Now</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.2s">
                            <Link to="/shop">
                                <div className="text-center bg-primary rounded position-relative">
                                    <img src="/img/product-banner-2.jpg" className="img-fluid w-100" alt="" />
                                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center rounded p-4"
                                        style={{ background: 'rgba(242, 139, 0, 0.5)' }}>
                                        <h2 className="display-2 text-secondary">SALE</h2>
                                        <h4 className="display-5 text-white mb-4">Get UP To 50% Off</h4>
                                        <span className="btn btn-secondary rounded-pill align-self-center py-2 px-4">Shop
                                            Now</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid products productList overflow-hidden">
                <div className="container products-mini py-5">
                    <div className="mx-auto text-center mb-5" style={{ maxWidth: '900px' }}>
                        <h4 className="text-primary border-bottom border-primary border-2 d-inline-block p-2 title-border-radius wow fadeInUp"
                            data-wow-delay="0.1s">Products</h4>
                        <h1 className="mb-0 display-3 wow fadeInUp" data-wow-delay="0.3s">All Product Items</h1>
                    </div>
                    <div className="productList-carousel owl-carousel pt-4 wow fadeInUp" data-wow-delay="0.3s">
                        {products.map(product => (
                            <div key={product._id} className="p-2">
                                <div className="product-item rounded border position-relative">
                                    <div className="product-item-inner border rounded">
                                        <div className="product-item-inner-item">
                                            <img src={product.image} className="img-fluid w-100 rounded-top" alt={product.name} style={{ height: '250px', objectFit: 'contain', padding: '10px' }} />
                                            <div className="product-details">
                                                <Link to={`/product/${product._id}`}><i className="fa fa-eye fa-1x"></i></Link>
                                            </div>
                                        </div>
                                        <div className="text-center rounded-bottom p-4">
                                            <a href="#" className="d-block mb-2">{product.category}</a>
                                            <Link to={`/product/${product._id}`} className="d-block h4">{product.name}</Link>
                                            <span className="text-primary fs-5">${product.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="product-item-add border border-top-0 rounded-bottom text-center p-4 pt-0">
                                        <button
                                            className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                                            onClick={async () => {
                                                try {
                                                    const btn = document.activeElement;
                                                    const originalText = btn.innerHTML;
                                                    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Adding...';
                                                    await fetch('http://127.0.0.1:5000/api/cart/add', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ productId: product._id, quantity: 1 })
                                                    });
                                                    window.location.href = '/cart';
                                                } catch (e) { console.error(e); }
                                            }}
                                        >
                                            <i className="fas fa-shopping-cart me-2"></i> Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container-fluid testimonial py-5">
                <div className="container py-5">
                    <div className="mx-auto text-center mb-5" style={{ maxWidth: '700px' }}>
                        <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius wow fadeInUp"
                            data-wow-delay="0.1s">Testimonials</h4>
                        <h1 className="display-3 wow fadeInUp" data-wow-delay="0.3s">What Our Clients Say</h1>
                    </div>
                    <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.5s">
                        <div className="testimonial-item bg-light rounded p-4">
                            <div className="d-flex align-items-center mb-4">
                                <img src="/img/avatar.jpg" className="img-fluid rounded-circle border border-2 border-primary p-2"
                                    style={{ width: '100px', height: '100px' }} alt="" />
                                <div className="ms-4">
                                    <h4>David Jheson</h4>
                                    <p className="m-0">Business Man</p>
                                    <div className="d-flex text-primary">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-0">Exceptional service and high-quality electronics. The delivery was fast and the product was exactly as described. Will definitely buy again!</p>
                        </div>
                        <div className="testimonial-item bg-light rounded p-4">
                            <div className="d-flex align-items-center mb-4">
                                <img src="/img/avatar.jpg" className="img-fluid rounded-circle border border-2 border-primary p-2"
                                    style={{ width: '100px', height: '100px' }} alt="" />
                                <div className="ms-4">
                                    <h4>Michael Smith</h4>
                                    <p className="m-0">Tech Enthusiast</p>
                                    <div className="d-flex text-primary">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-0">Found exactly what I was looking for at a great price. The website is easy to navigate and the checkout process was seamless.</p>
                        </div>
                        <div className="testimonial-item bg-light rounded p-4">
                            <div className="d-flex align-items-center mb-4">
                                <img src="/img/avatar.jpg" className="img-fluid rounded-circle border border-2 border-primary p-2"
                                    style={{ width: '100px', height: '100px' }} alt="" />
                                <div className="ms-4">
                                    <h4>Olivia Brown</h4>
                                    <p className="m-0">Marketing Expert</p>
                                    <div className="d-flex text-primary">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-0">Best customer support I have ever experienced. They helped me choose the right laptop and kept me updated on my order status.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid products pb-5">
                <div className="container products-mini py-5">
                    <div className="mx-auto text-center mb-5" style={{ maxWidth: '700px' }}>
                        <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius wow fadeInUp"
                            data-wow-delay="0.1s">Bestseller Products</h4>
                        <p className="mb-0 wow fadeInUp" data-wow-delay="0.2s">Check out our most popular and highest rated electronics items.</p>
                    </div>
                    <div className="row g-4">
                        {getTopSelling().map(product => (
                            <div key={product._id} className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="products-mini-item border">
                                    <div className="row g-0">
                                        <div className="col-5">
                                            <div className="products-mini-img border-end h-100">
                                                <img src={product.image} className="img-fluid w-100 h-100" alt={product.name} />
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <Link to={`/product/${product._id}`}><i className="fa fa-eye fa-1x text-white"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-7">
                                            <div className="products-mini-content p-3">
                                                <a href="#" className="d-block mb-2">{product.category}</a>
                                                <Link to={`/product/${product._id}`} className="d-block h4">{product.name}</Link>
                                                <del className="me-2 fs-5">${(product.price * 1.2).toFixed(2)}</del>
                                                <span className="text-primary fs-5">${product.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="products-mini-add border p-3">
                                        <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                            className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                        <div className="d-flex">
                                            <a href="#"
                                                className="text-primary d-flex align-items-center justify-content-center me-3">
                                                <span className="rounded-circle btn-sm-square border">
                                                    <i className="fas fa-random"></i>
                                                </span>
                                            </a>
                                            <a href="#"
                                                className="text-primary d-flex align-items-center justify-content-center me-0">
                                                <span className="rounded-circle btn-sm-square border">
                                                    <i className="fas fa-heart"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Home;

