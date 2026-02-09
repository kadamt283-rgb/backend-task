import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, isWishlist, onRemove }) => {
    const { addToWishlist, removeFromWishlist } = useWishlist();
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="product-item rounded wow fadeInUp" data-wow-delay="0.1s">
                <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                        <img src={product.image} className="img-fluid w-100 rounded-top" alt={product.name} />
                        {product.badge === 'new' && <div className="product-new">New</div>}
                        {product.badge === 'sale' && <div className="product-sale">Sale</div>}
                        {product.badge === 'featured' && <div className="product-featured">Featured</div>}
                        <div className="product-details">
                            <Link to={`/product/${product._id}`}><i className="fa fa-eye fa-1x"></i></Link>
                        </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                        <a href="#" className="d-block mb-2">{product.category || 'Uncategorized'}</a>
                        <Link to={`/product/${product._id}`} className="d-block h4">{product.name || 'Unnamed Product'}</Link>
                        <del className="me-2 fs-5">${((product.price || 0) * 1.2).toFixed(2)}</del>
                        <span className="text-primary fs-5">${(product.price || 0).toFixed(2)}</span>
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
                                await fetch(`${config.API_BASE_URL}/api/cart/add`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ productId: product._id, quantity: 1 })
                                });

                                window.location.href = '/cart';
                            } catch (e) {
                                console.error(e);
                                alert('Failed to add to cart');
                            }
                        }}
                    >
                        <i className="fas fa-shopping-cart me-2"></i> Add To Cart
                    </button>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star ${i < product.rating ? 'text-primary' : ''}`}></i>
                            ))}
                        </div>
                        <div className="d-flex">
                            <a href="#" className="text-primary d-flex align-items-center justify-content-center me-3">
                                <span className="rounded-circle btn-sm-square border"><i className="fas fa-random"></i></span>
                            </a>
                            {isWishlist ? (
                                <a
                                    href="#"
                                    className="text-danger d-flex align-items-center justify-content-center me-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromWishlist(product._id);
                                        if (onRemove) onRemove(product._id);
                                    }}
                                    title="Remove from Wishlist"
                                >
                                    <span className="rounded-circle btn-sm-square border border-danger"><i className="fas fa-trash-alt"></i></span>
                                </a>
                            ) : (
                                <a
                                    href="#"
                                    className="text-primary d-flex align-items-center justify-content-center me-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToWishlist(product._id);
                                    }}
                                >
                                    <span className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
