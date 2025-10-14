import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js'; // Explicit .js extension
import { CustomError } from './utils/error.utils.js';

// Load environment variables
try {
  dotenv.config();
  if (!process.env.JWT_SECRET || !process.env.MONGO_URI || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Missing required environment variables');
  }
  console.log('Environment variables loaded successfully');
} catch (error) {
  console.error('Error loading environment variables:', error);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// User routes
try {
  app.use('/api/users', userRoutes);
  console.log('User routes mounted successfully');
} catch (error) {
  console.error('Error mounting user routes:', error);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
  });
  if (err instanceof CustomError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
      data: null,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
});

// MongoDB connection
const connectDB = async () => {
  try {
    console.log('Attempting MongoDB connection...');
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();