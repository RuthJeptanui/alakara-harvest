import { Transport } from '../models/transport.model.ts';
import type { ITransport } from '../interfaces/dtos/transport-dtos.ts';

// Create a new listing
export const createTransportListing = async (data: Partial<ITransport>): Promise<ITransport> => {
  const newTransport = new Transport(data);
  return await newTransport.save();
};

// Get all available listings (for farmers)
export const getAllTransports = async (): Promise<ITransport[]> => {
  // Only fetch items marked as available
  return await Transport.find({ isAvailable: true }).sort({ createdAt: -1 });
};

// Get listings belonging to a specific user (for transporters)
export const getUserTransports = async (userId: string): Promise<ITransport[]> => {
  return await Transport.find({ userId }).sort({ createdAt: -1 });
};

// Delete a listing
export const deleteTransportListing = async (id: string, userId: string): Promise<ITransport | null> => {
  // Ensure user deletes only their own listing
  return await Transport.findOneAndDelete({ _id: id, userId });
};