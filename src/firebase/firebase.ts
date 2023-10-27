import * as admin from "firebase-admin";

var serviceAccount = require("serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "project-gemini-next.appspot.com",
    });
}

export { admin };
