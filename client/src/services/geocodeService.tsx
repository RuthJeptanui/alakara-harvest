export async function getGeocode(address: string | number | boolean) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/geocode?address=${encodeURIComponent(address)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch geocode');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching geocode:', error);
    throw error;
  }
}
