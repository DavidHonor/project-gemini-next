import * as admin from "firebase-admin";

//var serviceAccount = require("serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.PROJECT_ID,
            clientEmail: process.env.CLIENT_EMAIL,
            privateKey: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
        storageBucket: "project-gemini-next.appspot.com",
    });
}

export { admin };
