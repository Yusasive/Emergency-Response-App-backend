const db = require("../config/firebase");

exports.getProfile = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId query parameter." });
  }

  try {
    const ref = db.ref(`users/${userId}/profile`);
    const snapshot = await ref.once("value");
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile", details: error.message });
  }
};

exports.saveProfile = async (req, res) => {
  const { userId, profile } = req.body;

  if (!userId || !profile) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const ref = db.ref(`users/${userId}/profile`);
    await ref.set(profile);
    res.json({ success: true, message: "Profile saved successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to save profile", details: error.message });
  }
};
