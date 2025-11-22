const API_URL = 'http://localhost:5000/api';

export interface ITransport {
  _id?: string;
  ownerName: string;
  phoneNumber: string;
  vehicleType: string;
  location: string;
  capacity: string;
  rate: string;
  availability: string;
  isAvailable?: boolean;
}

export const getAllTransports = async (token: string): Promise<ITransport[]> => {
  const response = await fetch(`${API_URL}/transport`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch transports');
  return response.json();
};

export const getMyTransports = async (token: string): Promise<ITransport[]> => {
  const response = await fetch(`${API_URL}/transport/my`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch your transports');
  return response.json();
};

export const createTransport = async (token: string, data: ITransport): Promise<ITransport> => {
  const response = await fetch(`${API_URL}/transport`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to create listing');
  return response.json();
};

export const deleteTransport = async (token: string, id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/transport/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete listing');
};