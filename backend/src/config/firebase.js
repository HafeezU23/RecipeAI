const firebaseAdmin = require("firebase-admin");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (err) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:", err);
    }
}

if (!serviceAccount) {
    serviceAccount = require("../../serviceAccountKey.json");
}

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

module.exports = firebaseAdmin