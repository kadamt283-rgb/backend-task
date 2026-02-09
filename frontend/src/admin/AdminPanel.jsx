import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [view, setView] = useState('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${config.API_BASE_URL}/api/products`);
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${config.API_BASE_URL}/api/products/${editingId}`, formData);
            } else {
                await axios.post(`${config.API_BASE_URL}/api/products`, formData);
            }
            setFormData({ name: '', description: '', price: '', category: '', image: '', stock: '' });
            setEditingId(null);
            setIsFormOpen(false);
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            stock: product.stock
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${config.API_BASE_URL}/api/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        totalProducts: products.length,
        totalCategories: [...new Set(products.map(p => p.category))].length,
        outOfStock: products.filter(p => p.stock <= 0).length,
        avgPrice: products.length ? (products.reduce((acc, p) => acc + p.price, 0) / products.length).toFixed(2) : 0
    };

    return (
        <div className="container-fluid">
            <div className="row">

                <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse py-5 border-end" style={{ minHeight: '80vh' }}>
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button
                                    className={`nav-link border-0 bg-transparent w-100 text-start ${view === 'dashboard' ? 'text-primary fw-bold' : 'text-dark'}`}
                                    onClick={() => setView('dashboard')}
                                >
                                    <i className="fas fa-tachometer-alt me-2"></i> Dashboard
                                </button>
                            </li>
                            <li className="nav-item mt-2">
                                <button
                                    className={`nav-link border-0 bg-transparent w-100 text-start ${view === 'products' ? 'text-primary fw-bold' : 'text-dark'}`}
                                    onClick={() => setView('products')}
                                >
                                    <i className="fas fa-box me-2"></i> Products
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-5">
                    {view === 'dashboard' ? (
                        <div>
                            <h2 className="mb-4">Dashboard Overview</h2>
                            <div className="row g-4">
                                <div className="col-md-3">
                                    <div className="card text-center p-4 shadow-sm border-0 bg-primary text-white">
                                        <h3>{stats.totalProducts}</h3>
                                        <p className="mb-0">Total Products</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card text-center p-4 shadow-sm border-0 bg-secondary text-white">
                                        <h3>{stats.totalCategories}</h3>
                                        <p className="mb-0">Categories</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card text-center p-4 shadow-sm border-0 bg-warning text-dark">
                                        <h3>{stats.outOfStock}</h3>
                                        <p className="mb-0">Out of Stock</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card text-center p-4 shadow-sm border-0 bg-info text-white">
                                        <h3>${stats.avgPrice}</h3>
                                        <p className="mb-0">Avg Price</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 card p-4 shadow-sm border-0">
                                <h4>Recent Activity</h4>
                                <p className="text-muted small">No recent orders yet (Mock data).</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2>Product Management</h2>
                                <button className="btn btn-primary" onClick={() => { setIsFormOpen(true); setEditingId(null); setFormData({ name: '', description: '', price: '', category: '', image: '', stock: '' }); }}>
                                    <i className="fas fa-plus me-2"></i> Add Product
                                </button>
                            </div>

                            {isFormOpen && (
                                <div className="card p-4 mb-4 shadow-sm border-0">
                                    <h4>{editingId ? 'Edit Product' : 'Add New Product'}</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label small">Name</label>
                                                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label small">Price ($)</label>
                                                <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label small">Stock</label>
                                                <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small">Category</label>
                                                <input type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small">Image URL</label>
                                                <input type="text" name="image" className="form-control" value={formData.image} onChange={handleChange} required />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small">Description</label>
                                                <textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange}></textarea>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <button type="submit" className="btn btn-primary me-2 px-4">{editingId ? 'Update' : 'Save'}</button>
                                                <button type="button" className="btn btn-light px-4" onClick={() => setIsFormOpen(false)}>Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div className="card p-4 shadow-sm border-0">
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control w-25"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Stock</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map(product => (
                                                <tr key={product._id}>
                                                    <td><img src={product.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover' }} className="rounded" /></td>
                                                    <td>{product.name}</td>
                                                    <td><span className="badge bg-light text-dark">{product.category}</span></td>
                                                    <td>${product.price}</td>
                                                    <td className={product.stock <= 0 ? 'text-danger fw-bold' : ''}>{product.stock}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(product)}><i className="fas fa-edit"></i></button>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product._id)}><i className="fas fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;
