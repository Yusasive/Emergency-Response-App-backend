const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.makeEmergencyCall = async (req, res) => {
  const { phoneNumber, location } = req.body;

  if (!phoneNumber || !location) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    await client.messages.create({
      body: `Emergency alert! The user is located at: ${location}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.json({ success: true, message: "Emergency call initiated." });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate emergency call", details: error.message });
  }
};

exports.notifyContacts = async (req, res) => {
  const { contacts, location } = req.body;

  if (!contacts || !Array.isArray(contacts) || !location) {
    return res.status(400).json({ error: "Missing or invalid required fields." });
  }

  try {
    const messages = contacts.map(contact =>
      client.messages.create({
        body: `Emergency alert! The user is located at: ${location}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: contact,
      })
    );

    await Promise.all(messages);

    res.json({ success: true, message: "Contacts notified." });
  } catch (error) {
    res.status(500).json({ error: "Failed to notify contacts", details: error.message });
  }
};
