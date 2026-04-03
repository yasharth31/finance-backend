# Finance Data Processing Backend

## Features
- User Authentication (Register/Login with JWT)
- Role-Based Access Control (Admin/User)
- Financial Records CRUD (Create, Read, Update, Delete)
- Record Filtering (by date, type, category)
- Dashboard Summary APIs (totals, insights)
- Input Validation and Error Handling
- Secure Data Storage using MongoDB

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Express Validator

## Installation

1. Clone the repository:
   git clone https://github.com/yasharth31/finance-backend

2. Install dependencies:
   npm install

3. Create a .env file and add:
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/financebackend
   JWT_SECRET=supersecret

4. Run the server:
   node server.js



## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Transactions
- POST /api/transactions
- GET /api/transactions/me
- PUT /api/transactions/:id
- DELETE /api/transactions/:id
- GET /api/transactions/summary

## Dashboard APIs

- Total Income
- Total Expenses
- Balance Calculation
- Monthly Trends

## Access Control

- User → Can manage own transactions
- Admin → Can access all users' data

## Author
Yasharth Gupta