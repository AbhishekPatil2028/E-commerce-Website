# 🛒 MERN E-commerce Application

## 📌 Overview

A full-stack E-commerce web application built using the MERN stack. This project includes user authentication, product management, cart functionality, order processing, and an admin dashboard with sales analytics.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login (JWT Authentication)
* Browse Products
* Add to Cart / Remove from Cart
* Place Orders
* View Order History

### 🛠 Admin Features

* Manage Users
* Manage Products (CRUD)
* Manage Orders
* View Sales Analytics Dashboard (Charts)

---

## 🧰 Tech Stack

### Frontend

* React.js
* Redux Toolkit + Redux Persist
* Tailwind CSS
* Axios
* Recharts (for charts)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* REST APIs

---

## 📊 Dashboard Preview

* Displays total users, orders, products, and revenue
* Interactive sales chart (last 30 days)

---

## 📂 Project Structure

```
E-commerce/
│── client/        # React Frontend
│── server/        # Node.js Backend
│── models/        # Mongoose Models
│── routes/        # API Routes
│── controllers/   # Business Logic
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone (https://github.com/AbhishekPatil2028/E-commerce-Website/).git
cd E-commerce-Website
```

### 2️⃣ Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file in **server** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the Project

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd client
npm run dev
```

---

## 🌐 API Endpoints (Sample)

* `POST /api/user/register` → Register user
* `POST /api/user/login` → Login user
* `GET /api/products` → Get all products
* `POST /api/cart/add` → Add to cart
* `POST /api/orders` → Place order
* `GET /api/orders/sales` → Sales analytics

---

## 📸 Screenshots



---

## 🔐 Authentication

* Secure JWT-based authentication
* Protected routes for users and admin

---

## 📈 Future Improvements


* Product Reviews & Ratings
* Wishlist Feature


---

## 🧑‍💻 Author

**Abhishek Ankush Patil**

* GitHub: (https://github.com/AbhishekPatil2028/)
* LinkedIn: (https://www.linkedin.com/in/abhishek-patil-2811a1290/)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
