# Buddy Script - Social Network Platform

A full-stack social networking web application converted from flat HTML/CSS templates into a modern, secure, and reactive React + Node.js application.

---

## 🚀 Features Implemented
- **Secure Authentication & Authorization**: Session validation using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Firebase Google Sign-In**: Seamless one-click registration and login using Firebase Google Authentication.
- **Dynamic Post Feed**: Create posts containing text and images, sorted automatically with the newest first.
- **Public & Private Visibility**: Define post visibility (`public` visible to all logged-in users, `private` visible only to the author).
- **Interactive Comment & Nested Reply System**: Comment on posts, reply directly to comments, and toggle likes for comments/replies.
- **Live Reactions & Share Counts**: Dynamic counters displaying actual count values synced to MongoDB.
- **Likers List Tooltip**: Hover tooltips over posts, comments, and replies listing the specific users who liked them.
- **Initials-Based Colored Avatars**: Dynamically generated initials inside colored circles representing users, avoiding static hardcoded mock avatars.
- **Cloud-Based Image Uploads**: Integrates ImgBB Cloud API directly to host uploaded post images online, eliminating local file uploads.

---

## 🛠️ Technology Stack

### Frontend (Client)
- **React.js** (Vite build tool)
- **React Router DOM** (Single Page Application Routing)
- **Firebase Authentication SDK** (Google Sign-In integration)
- **Vanilla CSS** (Mockup-identical styles)

### Backend (Server)
- **Node.js** & **Express.js**
- **MongoDB** (Database storage)
- **JWT (JsonWebToken)** (Authorization token headers)
- **BcryptJS** (Secure credential hashing)
- **Multer** (Multipurpose body-parser)

---

## 📂 Project Structure

```text
buddy-script/
├── backend/
│   ├── index.js              # Express app, middleware, and database routes
│   ├── package.json          # Node dependencies and scripts
│   └── .env                  # Port and Database configuration
└── frontend/
    ├── public/               # Static assets (images, icons)
    ├── src/
    │   ├── config/
    │   │   └── firebase.js   # Firebase Client SDK Configuration
    │   ├── pages/
    │   │   ├── Login/        # Login Page Component & CSS
    │   │   ├── Register/     # Registration Page Component & CSS
    │   │   └── Feed/         # Feed Component, PostItem, CreatePost, Sidebar
    │   ├── App.jsx           # Routing & Auth checks wrapper
    │   ├── main.jsx          # App initialization entrypoint
    │   └── .env              # Backend URL and API keys
    ├── package.json          # Vite scripts and dependencies
    └── vite.config.js        # Vite compilation rules
```

---

## 🔌 API Endpoints (Backend REST API)

### Authentication
- `POST /api/auth/register` - Create a new user with standard credentials.
- `POST /api/auth/login` - Authenticate standard user credentials, returns JWT.
- `POST /api/auth/google` - Verifies Google credentials, registers new accounts on the fly, returns JWT.

### Feed & Posts
- `POST /api/posts` - Create a post (accepts text, visibility, and/or hosted image URL).
- `GET /api/posts` - Fetch visible posts (all public posts + user's own private posts) sorted newest first.
- `PUT /api/posts/:id/like` - Toggle like/unlike status for a post.
- `PUT /api/posts/:id/share` - Increment the share counter for a post.

### Comments & Replies
- `POST /api/posts/:id/comment` - Add a comment to a post.
- `PUT /api/posts/:id/comment/:commentId/like` - Toggle like status on a comment.
- `POST /api/posts/:id/comment/:commentId/reply` - Reply to a specific comment.
- `PUT /api/posts/:id/comment/:commentId/reply/:replyId/like` - Toggle like status on a reply.

---

## ⚙️ Local Setup Guide

Follow these steps to run the application locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- A running MongoDB Database (Local instance or MongoDB Atlas cluster)

---

### Step 1: Configure & Start the Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN=your_jwt_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will boot up at `http://localhost:5000`.*

---

### Step 2: Configure & Start the Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `frontend/` directory:
   ```env
    VITE_API_URL=http://localhost:5000
    VITE_IMGBB_API_KEY=your_imgbb_api_key_here
    VITE_FIREBASE_API_KEY=your_firebase_api_key_here
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id_here
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
    VITE_FIREBASE_APP_ID=your_firebase_app_id_here
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend client will start running at `http://localhost:5173`.*

---

## 🧪 Testing in Browser
- Open your browser and navigate to `http://localhost:5173`.
- Go to `/register` or `/login` and test standard credentials or use the **Google Sign-in** popup.
- Write a post, toggle visibility, select an image (which will upload to ImgBB), check dynamic likes, comments, and replies on the feed!
