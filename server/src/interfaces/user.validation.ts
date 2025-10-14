import { z } from 'zod';
import { LANGUAGES, ACCOUNT_STATUSES, HARVEST_FREQUENCIES } from '../utils/constants.utils';

export const registerSchema = z.object({
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15),
  password: z.string().min(8),
  profile: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    farmName: z.string().optional(),
    location: z.object({
      coordinates: z.array(z.number()).length(2), // [longitude, latitude]
      county: z.string().min(1),
      subCounty: z.string().min(1),
      ward: z.string().min(1),
    }),
    language: z.enum(LANGUAGES),
    profileImage: z.string().optional(),
  }),
  crops: z
    .array(
      z.object({
        cropName: z.string().min(1),
        varieties: z.array(z.string()).optional(),
        farmSize: z.number().positive(),
        averageYield: z.number().positive(),
        harvestFrequency: z.enum(HARVEST_FREQUENCIES),
      })
    )
    .optional(),
  preferences: z
    .object({
      notificationsEnabled: z.boolean().optional(),
      smsAlerts: z.boolean().optional(),
      emailAlerts: z.boolean().optional(),
      preferredMarkets: z.array(z.string()).optional(),
    })
    .optional(),
});

export const loginSchema = z.object({
  emailOrPhone: z.string().min(1),
  password: z.string().min(8),
});

export const updateProfileSchema = z.object({
  profile: z
    .object({
      firstName: z.string().min(1).optional(),
      lastName: z.string().min(1).optional(),
      farmName: z.string().optional(),
      location: z
        .object({
          coordinates: z.array(z.number()).length(2).optional(),
          county: z.string().min(1).optional(),
          subCounty: z.string().min(1).optional(),
          ward: z.string().min(1).optional(),
        })
        .optional(),
      language: z.enum(LANGUAGES).optional(),
      profileImage: z.string().optional(),
    })
    .optional(),
  crops: z
    .array(
      z.object({
        cropName: z.string().min(1),
        varieties: z.array(z.string()).optional(),
        farmSize: z.number().positive(),
        averageYield: z.number().positive(),
        harvestFrequency: z.enum(HARVEST_FREQUENCIES),
      })
    )
    .optional(),
  preferences: z
    .object({
      notificationsEnabled: z.boolean().optional(),
      smsAlerts: z.boolean().optional(),
      emailAlerts: z.boolean().optional(),
      preferredMarkets: z.array(z.string()).optional(),
    })
    .optional(),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});