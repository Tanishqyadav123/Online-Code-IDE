import { createClerkClient } from "@clerk/clerk-sdk-node";
import "dotenv/config"
const userId = "user_3AeIyzZGUrozB5PF6LQRNAdsHYZ";

const expiresInSeconds = 60 * 60 * 24 * 7; // 1 week

console.log({
   publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
})
const client = createClerkClient({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

const response = await client.signInTokens.createSignInToken({
   userId,
   expiresInSeconds
})

console.log(response)
