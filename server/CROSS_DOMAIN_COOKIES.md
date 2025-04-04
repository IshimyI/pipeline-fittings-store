# Cross-Domain Cookie Configuration Guide

This document explains how to properly configure cross-domain cookies between your Render backend and Vercel frontend.

## Problem

When your backend is hosted on Render and your frontend is on Vercel, you may encounter issues with cookies not being properly set or sent across domains. This is due to:

1. Same-origin policy restrictions in browsers
2. Incorrect cookie configuration
3. Missing CORS headers
4. Improper domain settings

## Solution

We've implemented several changes to fix these issues:

1. Updated cookie configuration to support cross-domain usage
2. Enhanced CORS settings to allow credentials
3. Added proper domain validation
4. Implemented detailed logging for debugging

## Environment Variables

To make this work, you need to set these environment variables on your Render deployment:

```
NODE_ENV=production
IS_RENDER=true
FRONTEND_DOMAIN=pipeline-fittings-store-client.vercel.app
COOKIE_DOMAIN=pipeline-fittings-store-client.vercel.app
CLIENT_URL=https://pipeline-fittings-store-client.vercel.app
```

## Important Cookie Settings

For cross-domain cookies to work:

1. `sameSite` must be set to `'none'`
2. `secure` must be `true` (cookies only sent over HTTPS)
3. `domain` must be set to your frontend domain
4. The backend must be served over HTTPS

## Debugging

If you're still having issues:

1. Check the server logs for detailed cookie information
2. Verify that CORS is properly configured
3. Ensure your frontend is making requests with `credentials: 'include'`
4. Check that both sites are using HTTPS
5. Verify the domain settings match exactly

## Frontend Configuration

Your frontend fetch requests must include:

```javascript
fetch('https://your-render-api.onrender.com/api/endpoint', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
```

The `credentials: 'include'` part is critical for sending cookies with cross-domain requests.

## Testing

After deploying these changes, test the authentication flow:

1. Login with valid credentials
2. Check your browser's cookies to verify the refresh token is set
3. Try refreshing the page to see if your login state persists
4. Check the network tab for any CORS errors