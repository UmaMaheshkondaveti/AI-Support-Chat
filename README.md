# AI Support Chat Application

This is a full-stack AI-powered customer support chat application with a **React frontend** and a **Node.js + Express + MongoDB backend**.

## 🧠 Features

- 🔐 JWT-based user authentication
- 🧑‍💼 Role-based access control (Admin, Support, Customer)
- 💬 Real-time chat interface (via WebSocket or REST APIs)
- 🛍️ Product and Order management system
- 📦 API integration with AI-powered support engine
- 🖥️ Responsive frontend with React
- ⚙️ Backend built with Express and MongoDB

---

## 📁 Project Structure

```
AI-Support-Chat/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   ├── .env
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder:

```
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm start
```

---

## 🛠️ Technologies Used

- **Frontend:** React, Axios, Context API, CSS/SCSS
- **Backend:** Node.js, Express, JWT, MongoDB, Mongoose
- **Dev Tools:** Nodemon, dotenv, concurrently

---

## 📄 License

This project is licensed under the MIT License.
