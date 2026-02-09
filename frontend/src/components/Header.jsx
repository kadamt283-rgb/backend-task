import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '../config';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
    const { wishlistCount } = useWishlist();
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${config.API_BASE_URL}/api/products`);
                const products = await res.json();
                const cats = [...new Set(products.map(p => p.category))];
                const catCounts = cats.map(cat => ({
                    name: cat,
                    count: products.filter(p => p.category === cat).length
                }));
                setCategories(catCounts);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsAuthenticated(!!user);
    }, [location]);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const res = await fetch(`${config.API_BASE_URL}/api/cart`);
                const data = await res.json();
                if (data && data.items) {
                    const count = data.items.reduce((acc, item) => acc + item.quantity, 0);
                    setCartCount(count);
                }
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        };

        fetchCartCount();
    }, [location]);
    return (
        <>
            <div className="container-fluid px-5 d-none border-bottom d-lg-block">
                <div className="row gx-0 align-items-center">
                    <div className="col-lg-4 text-center text-lg-start mb-lg-0">
                        <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
                            <Link to="/debug" className="text-muted me-2"> Help</Link><small> / </small>
                            <Link to="/contact" className="text-muted mx-2"> Support</Link><small> / </small>
                            <Link to="/contact" className="text-muted ms-2"> Contact</Link>
                        </div>
                    </div>
                    <div className="col-lg-4 text-center d-flex align-items-center justify-content-center">
                        <small className="text-dark">Call Us:</small>
                        <a href="tel:9112626380" className="text-muted mx-2">9112626380</a>
                    </div>
                    <div className="col-lg-4 text-center text-lg-end">
                        <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle text-muted me-2" data-bs-toggle="dropdown"><small>
                                    USD</small></a>
                                <div className="dropdown-menu rounded">
                                    <a href="#" className="dropdown-item"> Euro</a>
                                    <a href="#" className="dropdown-item"> Dolar</a>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle text-muted mx-2" data-bs-toggle="dropdown"><small>
                                    English</small></a>
                                <div className="dropdown-menu rounded">
                                    <a href="#" className="dropdown-item"> English</a>
                                    <a href="#" className="dropdown-item"> Turkish</a>
                                    <a href="#" className="dropdown-item"> Spanol</a>
                                    <a href="#" className="dropdown-item"> Italiano</a>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle text-muted ms-2" data-bs-toggle="dropdown"><small><i
                                    className="fa fa-home me-2"></i> My Dashboard</small></a>
                                <div className="dropdown-menu rounded">
                                    {isAuthenticated ? (
                                        <>
                                            <Link to="/account" className="dropdown-item"> My Account</Link>
                                            <Link to="/wishlist" className="dropdown-item"> Wishlist</Link>
                                            <Link to="/cart" className="dropdown-item"> My Card</Link>
                                            <Link to="/notifications" className="dropdown-item"> Notifications</Link>
                                            <Link to="/account" className="dropdown-item"> Account Settings</Link>
                                            <a href="#" className="dropdown-item" onClick={(e) => {
                                                e.preventDefault();
                                                localStorage.removeItem('user');
                                                window.location.reload();
                                            }}> Log Out</a>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login" className="dropdown-item"> Login</Link>
                                            <Link to="/register" className="dropdown-item"> Register</Link>
                                            <Link to="/cart" className="dropdown-item"> My Card</Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid px-5 py-4 d-none d-lg-block">
                <div className="row gx-0 align-items-center text-center">
                    <div className="col-md-4 col-lg-3 text-center text-lg-start">
                        <div className="d-inline-flex align-items-center">
                            <Link to="/" className="navbar-brand p-0">
                                <h1 className="display-5 text-primary m-0"><i
                                    className="fas fa-shopping-bag text-secondary me-2"></i>Electro</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-6 text-center">
                        <div className="position-relative ps-4">
                            <div className="d-flex border rounded-pill">
                                <input
                                    className="form-control border-0 rounded-pill w-100 py-3"
                                    type="text"
                                    placeholder="Search Looking For?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary rounded-pill py-3 px-5"
                                    style={{ border: 0 }}
                                    onClick={handleSearch}
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-3 text-center text-lg-end">
                        <div className="d-inline-flex align-items-center">
                            <Link to="/debug" className="text-muted d-flex align-items-center justify-content-center me-3"><span
                                className="rounded-circle btn-md-square border"><i className="fas fa-random"></i></span></Link>
                            <Link to="/wishlist" className="text-muted d-flex align-items-center justify-content-center me-3 position-relative">
                                <span className="rounded-circle btn-md-square border"><i className="fas fa-heart"></i></span>
                                {wishlistCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ transform: 'translate(-25%, -25%)', fontSize: '10px' }}>
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/cart" className="text-muted d-flex align-items-center justify-content-center position-relative">
                                <span className="rounded-circle btn-md-square border"><i className="fas fa-shopping-cart"></i></span>

                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ transform: 'translate(-25%, -25%)', fontSize: '10px' }}>
                                    {cartCount}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container-fluid nav-bar p-0">
                <div className="row gx-0 bg-primary px-5 align-items-center">
                    <div className="col-lg-3 d-none d-lg-block">
                        <nav className="navbar navbar-light position-relative" style={{ width: '250px' }}>
                            <button className="navbar-toggler border-0 fs-4 w-100 px-0 text-start" type="button"
                                data-bs-toggle="collapse" data-bs-target="#allCat">
                                <h4 className="m-0 text-white"><i className="fa fa-bars me-2"></i>All Categories</h4>
                            </button>
                            <div className="collapse navbar-collapse rounded-bottom" id="allCat">
                                <div className="navbar-nav ms-auto py-0">
                                    <ul className="list-unstyled categories-bars">
                                        {categories.length > 0 ? categories.map((cat, index) => (
                                            <li key={index}>
                                                <div className="categories-bars-item">
                                                    <Link to={`/shop?search=${encodeURIComponent(cat.name)}`}>{cat.name}</Link>
                                                    <span>({cat.count})</span>
                                                </div>
                                            </li>
                                        )) : (
                                            <li><div className="categories-bars-item"><a href="#">No Categories</a></div></li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-12 col-lg-9">
                        <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
                            <Link to="/" className="navbar-brand d-block d-lg-none">
                                <h1 className="display-5 text-secondary m-0"><i
                                    className="fas fa-shopping-bag text-white me-2"></i>Electro</h1>
                            </Link>
                            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse">
                                <span className="fa fa-bars fa-1x"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav ms-auto py-0">
                                    <Link to="/" className="nav-item nav-link active">Home</Link>
                                    <Link to="/shop" className="nav-item nav-link">Shop</Link>
                                    <Link to="/shop" className="nav-item nav-link">Products</Link>
                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                        <div className="dropdown-menu m-0">
                                            <Link to="/bestseller" className="dropdown-item">Bestseller</Link>
                                            <Link to="/cart" className="dropdown-item">Cart Page</Link>
                                            <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                            <Link to="/404" className="dropdown-item">404 Page</Link>
                                        </div>
                                    </div>
                                    <Link to="/contact" className="nav-item nav-link me-2">Contact</Link>
                                </div>
                                <a href="tel:9112626380" className="btn btn-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0"><i
                                    className="fa fa-mobile-alt me-2"></i> 9112626380</a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Header;
