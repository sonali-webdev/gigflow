# 🚀 GigFlow – Full Stack Freelance Marketplace

GigFlow is a full-stack MERN application that allows clients to post gigs, freelancers to bid on them, and clients to hire freelancers with real-time notifications.

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Socket.io Client

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication (HttpOnly Cookies)
- Socket.io
- MongoDB Transactions

---

## ✨ Features

### Authentication

- User registration & login
- JWT-based authentication using HttpOnly cookies
- Protected routes

### Gigs

- Clients can post gigs
- All users can view available gigs

### Bidding

- Freelancers can apply to gigs
- Clients can view bids for their gigs only
- Role-based access control

### Hiring

- Client can hire one freelancer per gig
- Atomic hiring logic using MongoDB transactions
- Other bids are automatically rejected

### 🔔 Real-Time Notifications (Bonus)

- Freelancers receive instant notification when hired
- Implemented using Socket.io

---

## 📂 Project Structure

gigflow/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│ └── main.jsx
│
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

▶️ How to Run Locally
1️⃣ Backend
cd backend
npm install
npm run dev
Runs on: http://localhost:5000

2️⃣ Frontend
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

🧪 Testing Flow
Register two users (Client & Freelancer)
Client posts a gig
Freelancer applies to the gig
Client views bids and hires a freelancer
Freelancer receives real-time notification

🧠 Key Learnings
Secure authentication with HttpOnly cookies
Role-based authorization
MongoDB transactions to prevent race conditions
Real-time communication using Socket.io
Clean separation of frontend and backend

📌 Future Improvements
User profile page
Freelancer dashboard
Gig categories & search
Deployment (Vercel + Render)

👩‍💻 Author
Sonali Gupta
Full Stack Developer (MERN)


```
