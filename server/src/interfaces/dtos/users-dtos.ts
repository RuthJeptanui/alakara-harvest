export interface UserDTO {
  id: string;
  email: string;
  phoneNumber: string;
  profile: {
    firstName: string;
    lastName: string;
    farmName?: string;
    location: {
      type: "Point";
      coordinates: [number, number]; // [longitude, latitude] geoJSON format
      county: string;
      subCounty: string;
      ward: string;
    };
    languagePreference: string;
    profileImage?: string;
  };
  crops: {
    cropId: string;
    cropName: string;
    varieties: string[];
    farmSize: number;
    averageYield: number;
    harvestFrequency: string;
  }[];
  preferences: {
    notificationsEnabled: boolean;
    smsAlerts: boolean;
    emailAlerts: boolean;
    preferredMarkets: string[]; // Reference to markets collection
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
