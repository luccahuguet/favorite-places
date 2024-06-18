const API_KEY = "AIzaSyCESj6wtW3fPrK8Eo8UNFD3I4nRMuXML1s";

function getMapPreview(latitude, longitude) {
  const maps_url = `https://maps.googleapis.com/maps/api/staticmap?`;
  return `${maps_url}center=${latitude},${longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=${API_KEY}`;
}

export default getMapPreview;
