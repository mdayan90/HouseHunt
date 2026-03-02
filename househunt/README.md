# 🏠 HouseHunt – House Rent Management System
A full-stack MERN application for managing house rentals with role-based access control.

---

## 🗂️ Project Structure

```
househunt/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   ├── bookingController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT + role protection
│   ├── models/
│   │   ├── User.js
│   │   ├── Property.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── adminRoutes.js
│   ├── .env
│   ├── server.js
│   ├── seeder.js               # Static sample data
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── axios.js         # Axios instance with JWT interceptor
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── PropertyCard.js
    │   │   ├── PrivateRoute.js
    │   │   └── AdminRoute.js
    │   ├── context/
    │   │   └── AuthContext.js   # Global auth state
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Properties.js
    │   │   ├── PropertyDetail.js
    │   │   ├── UserDashboard.js
    │   │   ├── AddProperty.js
    │   │   └── admin/
    │   │       ├── AdminDashboard.js
    │   │       ├── AdminProperties.js
    │   │       ├── AdminUsers.js
    │   │       └── AdminBookings.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env
    └── package.json
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

---

### 1. Clone / Extract the project
```bash
cd househunt
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Edit `.env` as needed:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/househunt
JWT_SECRET=househunt_jwt_secret_key_2024
JWT_EXPIRE=7d
```

### 3. Seed the Database
```bash
npm run seed
```
This inserts sample users, properties, and bookings.

### 4. Start the Backend
```bash
npm run dev       # development (nodemon)
# or
npm start         # production
```
Server runs on: `http://localhost:5000`

---

### 5. Frontend Setup
```bash
cd ../frontend
npm install
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 6. Start the Frontend
```bash
npm start
```
App runs on: `http://localhost:3000`

---

## 🔐 Test Credentials (after seeding)

| Role    | Email                    | Password    |
|---------|--------------------------|-------------|
| Admin   | admin@househunt.com      | admin123    |
| User 1  | john@example.com         | password123 |
| User 2  | jane@example.com         | password123 |
| Landlord| mike@example.com         | password123 |

---

## 📡 API Endpoints Documentation

### Auth Routes — `/api/auth`

| Method | Endpoint          | Access  | Description          |
|--------|-------------------|---------|----------------------|
| POST   | `/register`       | Public  | Register new user    |
| POST   | `/login`          | Public  | Login & get JWT      |
| GET    | `/profile`        | Private | Get logged-in user   |

**Register body:**
```json
{ "name": "John", "email": "john@mail.com", "password": "pass123" }
```

**Login body:**
```json
{ "email": "john@mail.com", "password": "pass123" }
```

**Response (both):**
```json
{ "_id": "...", "name": "John", "email": "...", "role": "user", "token": "jwt..." }
```

---

### Property Routes — `/api/properties`

| Method | Endpoint      | Access  | Description                       |
|--------|---------------|---------|-----------------------------------|
| GET    | `/`           | Public  | Get approved properties (filters) |
| GET    | `/:id`        | Public  | Get single property                |
| GET    | `/my`         | Private | Get my listed properties           |
| POST   | `/`           | Private | Create new property listing        |
| DELETE | `/:id`        | Private | Delete own property                |

**Filter query params:** `search`, `location`, `type`, `minPrice`, `maxPrice`

**Create body:**
```json
{
  "title": "Nice Apartment",
  "description": "...",
  "location": "NYC, NY",
  "price": 2000,
  "type": "apartment",
  "amenities": ["WiFi", "Gym"]
}
```

---

### Booking Routes — `/api/bookings`

| Method | Endpoint           | Access  | Description         |
|--------|--------------------|---------|---------------------|
| POST   | `/`                | Private | Create a booking    |
| GET    | `/my`              | Private | Get my bookings     |
| PUT    | `/:id/cancel`      | Private | Cancel a booking    |

**Create body:**
```json
{ "propertyId": "...", "bookingDate": "2024-03-01", "message": "Hello!" }
```

---

### Admin Routes — `/api/admin` (Admin only)

| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| GET    | `/stats`                      | Dashboard statistics     |
| GET    | `/users`                      | Get all users            |
| DELETE | `/users/:id`                  | Delete a user            |
| GET    | `/properties`                 | Get all properties       |
| PUT    | `/properties/:id/approve`     | Approve a property       |
| DELETE | `/properties/:id`             | Delete any property      |
| GET    | `/bookings`                   | Get all bookings         |

---

## 🛡️ Authentication Flow

1. User registers/logs in → server returns JWT
2. JWT stored in `localStorage`
3. Axios interceptor attaches `Authorization: Bearer <token>` to every request
4. Protected routes verify JWT on the backend
5. Admin routes additionally check `user.role === 'admin'`

---

## 📦 MongoDB Schemas

### User
```js
{ name, email, password (hashed), role: ['user','admin'], timestamps }
```

### Property
```js
{ title, description, location, price, type, amenities[], owner (ref User), approved, timestamps }
```

### Booking
```js
{ user (ref User), property (ref Property), bookingDate, status, message, timestamps }
```

---

## ✨ Features Summary

- **Public**: Browse & filter approved properties, view details
- **User**: Register/login, book properties, dashboard (my bookings + my listings), list new property
- **Admin**: Approve/delete properties, manage users, view all bookings, stats dashboard
- **Security**: bcryptjs password hashing, JWT authentication, role-based route protection
