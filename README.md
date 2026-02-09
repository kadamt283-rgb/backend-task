# Electro MERN E-commerce Project

This is a full-stack E-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure
- **frontend/**: React application (Vite)
- **backend/**: Node.js/Express API server

## Features
- **User Authentication**: Login, Register, My Account, Wishlist (Persisted in MongoDB)
- **Product Management**: Dynamic products, Search functionality, Categories
- **Shopping Cart**: Add to cart, Update quantity, Real-time cart count
- **Checkout**: Order placement integration
- **Admin Panel**: Basic structure for product management
- **Notifications**: System notifications (e.g., Welcome message) saved to database

## How to Run

### 1. Backend
```bash
cd backend
npm run dev
```
Server runs on: http://localhost:5000

### 2. Frontend
```bash
cd frontend
npm run dev
```
Client runs on: http://localhost:5173

## Environment Variables
Ensure `.env` in `backend/` has:
```
MONGODB_URI=mongodb://localhost:27017/electro_mern
PORT=5000
```
