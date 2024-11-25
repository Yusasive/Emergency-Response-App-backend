const axios = require("axios");

exports.getResources = async (req, res) => {
  const { latitude, longitude, type } = req.query;

  if (!latitude || !longitude || !type) {
    return res.status(400).json({ error: "Missing required query parameters." });
  }

  try {
    const googleMapsURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const response = await axios.get(googleMapsURL, {
      params: {
        location: `${latitude},${longitude}`,
        radius: 5000,
        type,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources", details: error.message });
  }
};
