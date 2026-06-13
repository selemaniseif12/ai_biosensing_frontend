import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminDB = admin.firestore();
export const adminAuth = admin.auth();

/**
 * Verify Firebase ID Token
 */
export async function verifyIdToken(token: string) {
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (error) {
    console.error("Error verifying ID token:", error);
    throw error;
  }
}
