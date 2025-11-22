import { Router } from 'express';
import { getChatHistory, postMessage } from '../controllers/chatbot.controllers.ts';
import { requireAuthMiddleware } from '../middlewares/clerk.middleware.ts';

const router = Router();

// Get all messages for the user's session
router.get('/chat/history', requireAuthMiddleware, getChatHistory);

// Send a new message and get a bot response
router.post('/chat/message', requireAuthMiddleware, postMessage);

export default router;

// Remember to add this to your main app.ts/index.ts
// import chatRoutes from './routes/chatbot.routes';
// app.use('/api', chatRoutes);