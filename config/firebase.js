const admin = require("firebase-admin");
const serviceAccount = require("../firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://emergencyresponseapp-80040-default-rtdb.firebaseio.com",
});

const db = admin.database();

module.exports = db;
