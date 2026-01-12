const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "foodd-48ad3", // your Firebase project ID
  });
}

module.exports = admin;
