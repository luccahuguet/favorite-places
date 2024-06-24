const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

function getMapPreview(latitude, longitude) {
  const maps_url = `https://maps.googleapis.com/maps/api/staticmap?`;
  return `${maps_url}center=${latitude},${longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=${API_KEY}`;
}

export default getMapPreview;
