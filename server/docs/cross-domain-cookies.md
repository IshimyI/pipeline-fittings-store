# Cross-Domain Cookie Configuration Guide

This guide explains how to properly configure cookies for cross-domain usage between a Render backend and a Vercel frontend.

## Problem

When your backend is hosted on a different domain than your frontend (e.g., backend on Render, frontend on Vercel), browsers apply strict security rules to cookies. This is particularly important for authentication cookies like refresh tokens.

## Solution

We've implemented several changes to ensure cookies work correctly across domains:

1. **Secure Cookie Prefix**: We use the `__Secure-` prefix for cookies, which requires HTTPS and provides better security.

2. **SameSite=None**: This is required for cross-domain cookies but must be paired with `Secure=true`.

3. **Domain Configuration**: The cookie domain must be set correctly to allow cross-domain access.

4. **CORS Configuration**: CORS must be properly configured with `credentials: true` and appropriate headers.

## Environment Variables

Make sure these environment variables are set in your Render deployment:

```
NODE_ENV=production
IS_RENDER=true
FRONTEND_DOMAIN=pipeline-fittings-store-client.vercel.app
COOKIE_DOMAIN=pipeline-fittings-store-client.vercel.app
CLIENT_URL=https://pipeline-fittings-store-client.vercel.app
COOKIE_SAME_SITE=none
COOKIE_SECURE=true
COOKIE_HTTP_ONLY=true
```

## Frontend Configuration

Your frontend fetch requests must include `credentials: 'include'` to send cookies with cross-domain requests:

```javascript
fetch('https://your-render-backend.onrender.com/api/endpoint', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})
```

## Debugging

If you're still experiencing issues:

1. Check the browser's cookie storage to see if cookies are being set.
2. Look for CORS errors in the browser console.
3. Enable debug logging with `DEBUG_COOKIE_CONFIG=true` in your environment variables.
4. Verify that your frontend is using HTTPS (required for Secure cookies).
5. Check that your backend responses include the correct `Set-Cookie` headers.

## Common Issues

1. **Cookie Not Set**: This often happens when `SameSite=None` is used without `Secure=true`.
2. **Cookie Not Sent**: Check that your frontend requests include `credentials: 'include'`.
3. **CORS Errors**: Ensure your CORS configuration allows the correct origins and credentials.
4. **Invalid Domain**: The cookie domain must match or be a parent domain of the frontend.

## Testing

To test your configuration:

1. Login with valid credentials.
2. Check the browser's cookie storage (Dev Tools > Application > Cookies).
3. Refresh the page to see if your login state persists.
4. Check the network tab for any CORS errors or missing cookies.

## Security Considerations

Cross-domain cookies require careful security configuration:

1. Always use HTTPS for both frontend and backend.
2. Use `__Secure-` prefix for cookies.
3. Set `HttpOnly=true` for sensitive cookies like refresh tokens.
4. Implement proper CSRF protection.
5. Keep access token expiration short.