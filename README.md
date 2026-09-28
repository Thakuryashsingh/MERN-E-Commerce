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
- Refresh token used to request a new access token
- Protected routes
- Get currently authenticated user
- Logout clears tokens from browser storage
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
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator

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

## Beginner token flow

`backend/src/utils/auth.util.js` creates and verifies access and refresh tokens. The access token is sent with protected API requests. When it expires, the frontend sends the saved refresh token to `/api/auth/refresh-token` and retries the request.

For this beginner version, both tokens are stored in browser `localStorage`; logout removes them from there. Passwords are hashed with bcrypt. The refresh token is not revoked on the server when logging out.
