import * as admin from "firebase-admin";

//var serviceAccount = require("serviceAccountKey.json");

if (!process.env.FIREBASE_PRIVATE_KEY)
    throw new Error("Add firebase private key");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
        }),
        storageBucket: "project-gemini-next.appspot.com",
    });
}

export { admin };
