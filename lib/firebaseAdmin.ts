// Safe Firebase Admin placeholder for Vercel builds.
// Firebase Admin has been removed from the project, but some API routes
// still import verifyIdToken. This file prevents build failures.

export async function verifyIdToken(token: string) {
  return {
    valid: false,
    userId: null,
  };
}
