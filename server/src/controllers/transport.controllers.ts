import type { Request, Response } from 'express';
import * as transportService from '../services/transport.service.ts';

// Extend Request to include Clerk auth
interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
  };
}

export const createTransport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // Combine body data with the authenticated user ID
    // In a real app, we might fetch the ownerName from Clerk API or Profile DB
    const transportData = { ...req.body, userId };
    
    const newTransport = await transportService.createTransportListing(transportData);
    res.status(201).json(newTransport);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transport listing', error });
  }
};

export const getTransports = async (req: Request, res: Response) => {
  try {
    const transports = await transportService.getAllTransports();
    res.status(200).json(transports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transports', error });
  }
};

export const getMyTransports = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const transports = await transportService.getUserTransports(userId);
    res.status(200).json(transports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your transports', error });
  }
};

export const deleteTransport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const deleted = await transportService.deleteTransportListing(id, userId);
    if (!deleted) return res.status(404).json({ message: 'Transport not found or unauthorized' });

    res.status(200).json({ message: 'Transport deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transport', error });
  }
};