// src/models/user.model.ts
// Note: Adding this as it's necessary for Mongoose schema definition. Assuming Mongoose is used for MongoDB interaction.

import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  profile: {
    firstName: string;
    lastName: string;
    farmName?: string;
    location: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
      county: string;
      subCounty: string;
      ward: string;
    };
    language: string; // "en", "sw", "ki" etc.
    profileImage?: string;
  };
  crops: {
    cropId: Schema.Types.ObjectId; // Reference to crops collection
    cropName: string;
    varieties: string[];
    farmSize: number; // in acres
    averageYield: number; // in kg
    harvestFrequency: string; // "seasonal", "monthly", etc.
  }[];
  preferences: {
    notificationsEnabled: boolean;
    smsAlerts: boolean;
    emailAlerts: boolean;
    preferredMarkets: Schema.Types.ObjectId[]; // Reference to markets collection
  };
  metadata: {
    registrationDate: Date;
    lastLogin: Date;
    accountStatus: string; // "active", "suspended", "pending"
    verificationStatus: {
      phone: boolean;
      email: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    profile: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      farmName: { type: String },
      location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
        county: { type: String, required: true },
        subCounty: { type: String, required: true },
        ward: { type: String, required: true },
      },
      language: { type: String, required: true },
      profileImage: { type: String },
    },
    crops: [
      {
        cropId: { type: Schema.Types.ObjectId, ref: 'Crop' },
        cropName: { type: String, required: true },
        varieties: [{ type: String }],
        farmSize: { type: Number, required: true },
        averageYield: { type: Number, required: true },
        harvestFrequency: { type: String, required: true },
      },
    ],
    preferences: {
      notificationsEnabled: { type: Boolean, default: true },
      smsAlerts: { type: Boolean, default: true },
      emailAlerts: { type: Boolean, default: true },
      preferredMarkets: [{ type: Schema.Types.ObjectId, ref: 'Market' }],
    },
    metadata: {
      registrationDate: { type: Date, default: Date.now },
      lastLogin: { type: Date },
      accountStatus: { type: String, default: 'pending' },
      verificationStatus: {
        phone: { type: Boolean, default: false },
        email: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true }
);

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phoneNumber: 1 }, { unique: true });
userSchema.index({ 'profile.location': '2dsphere' });
userSchema.index({ 'metadata.accountStatus': 1, 'metadata.lastLogin': -1 });

export default model<IUser>('User', userSchema);
  