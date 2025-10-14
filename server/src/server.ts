// server.ts
import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import { connectDB } from './config/db.ts';

//import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.ts'; 
import { CustomError } from './utils/errors.utils.ts'; // Keep .js for ES Module runtime

// Load environment variables
dotenv.config();

if (!process.env.JWT_SECRET || !process.env.MONGO_URI || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Missing required environment variables');
  process.exit(1);
}
console.log('Environment variables loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Mount user routes
app.use('/api/users', userRoutes);

// Error handling middleware
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
