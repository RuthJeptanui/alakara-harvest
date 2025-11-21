import { Router } from 'express';
import { getChatHistory, postMessage } from '../controllers/chatbot.controllers.ts';

const router = Router();

// Get all messages for the user's session
router.get('/chat/history', getChatHistory);

// Send a new message and get a bot response
router.post('/chat/message', postMessage);

export default router;

// Remember to add this to your main app.ts/index.ts
// import chatRoutes from './routes/chat.routes';
// app.use('/api', chatRoutes);