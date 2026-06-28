# Task Tracker

A simple full-stack task tracker built with the MERN stack (MongoDB, Express, React, Node).
Create, edit, delete, and filter tasks by status and priority.

## Project Structure

```
task-tracker/
├── client/   # React frontend (Vite)
└── server/   # Express + MongoDB backend
```

## Getting Started

### 1. Backend

```bash
cd server
npm install
```

Edit `server/.env` and set your MongoDB connection string:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run it:

```bash
npm run dev    # with nodemon
# or
npm start
```

Server runs on http://localhost:5000

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

`client/.env` points the app at the backend:

```
VITE_API_URL=http://localhost:5000
```

Open the URL Vite prints (usually http://localhost:5173).

## API

Base path: `/api/tasks`

| Method | Route        | Description                                  |
| ------ | ------------ | -------------------------------------------- |
| GET    | `/`          | List tasks. Optional `?status=` `?priority=` |
| POST   | `/`          | Create a task (title required)               |
| PUT    | `/:id`       | Update a task                                |
| DELETE | `/:id`       | Delete a task                                |

All responses are JSON: `{ success: true, data: ... }` or `{ success: false, message: "..." }`

## Deployment

- **Backend → Render** (free tier). Set `MONGO_URI` and `PORT` as env vars in the dashboard.
- **Frontend → Vercel**. Set `VITE_API_URL` to your Render backend URL.
- After the backend is live, update `VITE_API_URL` in Vercel and redeploy the frontend.
