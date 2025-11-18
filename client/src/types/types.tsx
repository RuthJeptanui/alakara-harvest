export interface IUser {
  _id: string;
  email: string;
  phoneNumber: string;
  profile: {
    firstName: string;
    lastName: string;
    farmName?: string;
    location: {
      type: 'Point';
      coordinates: [number, number];
      county: string;
      subCounty: string;
      ward: string;
    };
    language: string;
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
    preferredMarkets: string[];
  };
  metadata: {
    registrationDate: string;
    lastLogin?: string;
    accountStatus: string;
    verificationStatus: {
      phone: boolean;
      email: boolean;
    };
  };
}

export interface PaginatedUsers {
  data: IUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}