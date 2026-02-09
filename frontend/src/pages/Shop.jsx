import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState(10000);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

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
    }, []);

    useEffect(() => {
        if (!loading && window.WOW) {
            new window.WOW().init();
        }
    }, [loading]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesPrice = (product.price || 0) <= priceRange;
            const name = product.name || '';
            const category = product.category || '';
            const query = searchQuery.toLowerCase();
            const matchesSearch = name.toLowerCase().includes(query) ||
                category.toLowerCase().includes(query);
            return matchesCategory && matchesPrice && matchesSearch;
        });
    }, [products, selectedCategory, priceRange, searchQuery]);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    return (
        <main>
            <Breadcrumb title="Shop Page" paths={[{ name: 'Pages', url: '#' }, { name: 'Shop', url: '/shop' }]} />


            <div className="container-fluid shop py-5">
                <div className="container py-5">
                    <div className="row g-4">

                        <div className="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="product-categories mb-4">
                                <h4>Products Categories</h4>
                                <ul className="list-unstyled">
                                    {categories.map((cat, index) => (
                                        <li key={index}>
                                            <div className="categories-item">
                                                <a
                                                    href="#"
                                                    className={`text-dark ${selectedCategory === cat ? 'fw-bold text-primary' : ''}`}
                                                    onClick={(e) => { e.preventDefault(); setSelectedCategory(cat); }}
                                                >
                                                    <i className="fas fa-apple-alt text-secondary me-2"></i>
                                                    {cat}
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="price mb-4">
                                <h4 className="mb-2">Price (Max: ${priceRange})</h4>
                                <input
                                    type="range"
                                    className="form-range w-100"
                                    min="0"
                                    max="10000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                />
                                <output>${priceRange}</output>
                            </div>

                            <div className="featured-product mb-4">
                                <h4 className="mb-3">Featured products</h4>

                                {products.slice(0, 3).map(product => (
                                    <div className="featured-product-item d-flex align-items-center mb-3" key={product._id}>
                                        <div className="rounded me-4" style={{ width: '100px', height: '100px' }}>
                                            <img src={product.image || "/img/product-3.png"} className="img-fluid rounded" alt={product.name} />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">{product.name}</h6>
                                            <div className="d-flex mb-2 text-secondary">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">${product.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <a href="#">
                                <div className="position-relative">
                                    <img src="/img/product-banner-2.jpg" className="img-fluid w-100 rounded" alt="Offer" />
                                    <div className="text-center position-absolute d-flex flex-column align-items-center justify-content-center rounded p-4"
                                        style={{ width: '100%', height: '100%', top: 0, right: 0, background: 'rgba(242, 139, 0, 0.3)' }}>
                                        <h5 className="display-6 text-primary">SALE</h5>
                                        <h4 className="text-secondary">Get UP To 50% Off</h4>
                                        <a href="#" className="btn btn-primary rounded-pill px-4">Shop Now</a>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-lg-9 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="rounded mb-4 position-relative">
                                <img src="/img/product-banner-3.jpg" className="img-fluid rounded w-100" style={{ height: '250px', objectFit: 'cover' }}
                                    alt="Banner" />
                                <div className="position-absolute rounded d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{ width: '100%', height: '250px', top: 0, left: 0, background: 'rgba(242, 139, 0, 0.3)' }}>
                                    <h4 className="display-5 text-primary">SALE</h4>
                                    <h3 className="display-4 text-white mb-4">Get UP To 50% Off</h3>
                                    <a href="#" className="btn btn-primary rounded-pill">Shop Now</a>
                                </div>
                            </div>

                            <div className="row g-4 mb-4">
                                <div className="col-xl-7">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input
                                            type="search"
                                            className="form-control p-3"
                                            placeholder="keywords"
                                            value={searchQuery}
                                            onChange={(e) => setSearchParams({ search: e.target.value })}
                                        />
                                        <span className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                    </div>
                                </div>
                                <div className="col-xl-5 text-end">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between align-items-center">
                                        <label className="me-2 mb-0">Sort By:</label>
                                        <select className="border-0 form-select-sm bg-light me-3">
                                            <option value="default">Default Sorting</option>
                                            <option value="popularity">Popularity</option>
                                            <option value="rating">Average Rating</option>
                                            <option value="low-high">Low to high</option>
                                            <option value="high-low">High to low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-4 product">
                                {loading ? (
                                    <div className="col-12 text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : filteredProducts.length > 0 ? (
                                    filteredProducts.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))
                                ) : (
                                    <div className="col-12 text-center py-5">
                                        <h4>No products found matching your criteria.</h4>
                                    </div>
                                )}
                            </div>

                            {filteredProducts.length > 12 && (
                                <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="pagination d-flex justify-content-center mt-5">
                                        <a href="#" className="rounded">&laquo;</a>
                                        <a href="#" className="active rounded">1</a>
                                        <a href="#" className="rounded">&raquo;</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Shop;
