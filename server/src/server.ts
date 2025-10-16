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
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://172.18.0.4:5173'],
    credentials: true,
  })
);
app.use(express.json());


//proxy for google api requests 
app.get('/api/geocode', async (req, res) => {
  try {
    const address = req.query.address;
    if (typeof address !== 'string') {
      return res.status(400).json({ error: 'Address query parameter is required and must be a string' });
    }
    // Use a server-side fetch without forwarding the client's Referer header to avoid API key referrer restrictions.
    // The referrerPolicy: 'no-referrer' option prevents sending the Referer header.
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`,
      { method: 'GET', referrerPolicy: 'no-referrer' }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching geocode:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// server will be started after DB connection in startServer()


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
