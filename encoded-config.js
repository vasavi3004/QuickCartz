/**
 * This file contains Base64 encoded credentials for GitHub deployment.
 * While this provides basic obfuscation, it's not fully secure for production.
 * This approach is only recommended for demo purposes.
 * 
 * For production, use a proper authentication service instead.
 */

// Base64 encoded credentials string
// Format before encoding: {"owner":{"username":"demo-owner","password":"demo-password","userType":"owner"},"employees":[{"username":"demo-emp","password":"demo-pass","userType":"employee"}]}
const encodedCredentials = "eyJvd25lciI6eyJ1c2VybmFtZSI6ImRlbW8tb3duZXIiLCJwYXNzd29yZCI6ImRlbW8tcGFzc3dvcmQiLCJ1c2VyVHlwZSI6Im93bmVyIn0sImVtcGxveWVlcyI6W3sidXNlcm5hbWUiOiJkZW1vLWVtcCIsInBhc3N3b3JkIjoiZGVtby1wYXNzIiwidXNlclR5cGUiOiJlbXBsb3llZSJ9XX0=";
