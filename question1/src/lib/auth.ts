// question1/src/lib/auth.ts
import 'server-only';

// Store token in memory (since Next.js API routes are stateless)
let authToken: string | null = null;
let tokenExpiry: number = 0;

export async function getAuthToken(): Promise<string> {
  const currentTime = Date.now();
  
  // If token exists and isn't expired, return it
  if (authToken && tokenExpiry > currentTime) {
    return authToken;
  }
  
  // Otherwise, refresh token
  try {
    const response = await fetch(`${process.env.BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      })
    });

    if (!response.ok) {
      throw new Error('Failed to refresh auth token');
    }

    const data = await response.json();
    authToken = data.access_token;
    // Set expiry to slightly before actual expiry to be safe
    tokenExpiry = data.expires_in - 60000; 
    
    return authToken;
  } catch (error) {
    console.error('Error refreshing auth token:', error);
    throw error;
  }
}