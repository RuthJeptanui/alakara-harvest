import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import { connectDB } from './config/db.ts';
// Use the official clerk-express-node SDK
import { requireAuth, clerkMiddleware } from "@clerk/express";
import dotenv from 'dotenv';
import cors from 'cors';

// --- Import our new routes ---
import chatRoutes from './routes/chatbot.routes.ts';
import profileRoutes from './routes/profile.routes.ts';

// --- Import our error handlers ---
//import { clerkErrorHandler } from './middleware/clerk.middleware.ts'; // From feat/profile
import { CustomError } from './utils/errors.utils.ts';
import { authMiddleware, clerkErrorHandler } from './middlewares/clerk.middleware.ts';


// Load environment variables
dotenv.config();

// --- Updated Environment Variable Check ---
// Clerk replaces the need for JWT_SECRET and email credentials
if (!process.env.CLERK_SECRET_KEY || !process.env.MONGO_URI) {
  console.error('Missing required environment variables: CLERK_SECRET_KEY or MONGO_URI');
  process.exit(1);
}
console.log('Environment variables loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware Setup ---

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  // credentials: true, // Not needed for Clerk's Bearer token auth
}));

app.use(express.json());

// Clerk middleware must run *before* all authenticated routes
// This will parse the token and attach 'req.auth'
app.use(clerkMiddleware());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// --- Mount API Routes ---

// Mount chat routes (which are not protected)
app.use('/api', chatRoutes);

// Mount profile routes (which *are* protected inside profile.routes.ts)
app.use('/api', profileRoutes);

// --- (Note: Removed old routes) ---
// Your test '/profile' route is removed, as we now use the /api/profile
// app.use('/api/users', userRoutes); // Commented out: Clerk handles user management


// --- Error Handling Middleware ---
// MUST be in this order

// 1. Clerk's error handler (catches 401s from 'requireAuth')
app.use(clerkErrorHandler);

// 2. Your custom error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
  });

  if (err instanceof CustomError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
  
  // Handle other potential errors (like JSON parsing errors)
  if (err.status) {
    return res.status(err.status).json({
        success: false,
        message: err.message,
        data: null
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    data: null,
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();