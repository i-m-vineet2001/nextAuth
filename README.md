# NextAuth - Full Stack Authentication App

A complete Next.js authentication system with MongoDB, JWT tokens, and user management.

## Features

- 🔐 User Registration & Login
- 🛡️ JWT Token Authentication
- 📧 Email Verification
- 🗄️ MongoDB Database Integration
- 🔒 Protected Routes with Middleware
- 🎨 Modern UI with Tailwind CSS
- 🔄 Toast Notifications

## Getting Started

First, install dependencies:

```bash
npm install
```

Set up your environment variables in `.env.local`:

```env
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app/api/users/` - Authentication API routes
- `/src/app/login/` - Login page
- `/src/app/signup/` - Registration page
- `/src/app/profile/` - Protected user profile
- `/src/middleware.ts` - Route protection middleware
- `/src/models/` - MongoDB models
- `/src/helpers/` - Utility functions

## Authentication Flow

1. User registers/logs in
2. JWT token stored in HTTP-only cookies
3. Middleware protects routes
4. Token verified on protected API calls

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Notifications**: React Hot Toast
