# MERN Store

A full-stack e-commerce application built with **React, Node.js, Express.js,
and MongoDB**.

This project implements JWT-based authentication, access and refresh token
handling, Product CRUD APIs, request validation using `express-validator`,
and a React frontend that consumes the backend APIs.

---

## Features

### Authentication

- User registration
- User login
- JWT Access Token
- JWT Refresh Token
- Refresh token using httpOnly cookie
- Protected routes
- Get currently authenticated user
- Secure logout
- Server-side refresh-token invalidation
- Password hashing using bcrypt

### Product Management

- Create product
- Get all products
- Get single product
- Update product
- Delete product
- Protected product write operations

### Validation

- Request body validation
- Request parameter validation
- Email validation
- Password validation
- Confirm password validation
- Product field validation
- MongoDB ObjectId validation
- Field-level validation errors

### Frontend

- React + Vite
- Register page
- Login page
- Product listing
- Product details
- Add product
- Edit product
- Delete product
- Protected routes
- Logout
- API integration using Axios
- Loading and error states

---

# Tech Stack

## Frontend

- React
- Vite
- React Router
- Axios
- CSS / Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator
- cookie-parser
- CORS

---

# Project Structure

```text
MERN/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   └── products/
│   │   │
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   └── products/
│   │   │
│   │   ├── services/
│   │   ├── utils/
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md