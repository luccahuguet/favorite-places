const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export function getMapPreview(latitude, longitude) {
  const maps_url = `https://maps.googleapis.com/maps/api/staticmap?`;
  return `${maps_url}center=${latitude},${longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=${API_KEY}`;
}

export async function getAddress(lat, lng) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch address. Please try again!");
  }

  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }

  if (!data.results || data.results.length === 0) {
    throw new Error("No address found!");
  }

  return data.results[0].formatted_address;
}
