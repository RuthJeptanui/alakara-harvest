import { Document } from 'mongoose';

export interface ITransport extends Document {
  userId: string; // Clerk User ID of the owner
  ownerName: string; // For display purposes
  phoneNumber: string;
  vehicleType: string; // e.g., Pickup, Lorry, Canter, TukTuk
  location: string; // e.g., Makueni, Nairobi
  capacity: string; // e.g., "2 Tonnes", "50 Crates"
  rate: string; // e.g., "5000 KSh per trip"
  availability: string; // e.g., "Mon-Fri", "Weekends only", "Daily"
  isAvailable: boolean; // To toggle visibility
}