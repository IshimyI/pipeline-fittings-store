# Cross-Domain Cookie Fix Implementation

This document outlines the changes made to fix cross-domain cookie issues between the Render backend and Vercel frontend.

## Changes Made

### 1. Cookie Configuration (`server/src/configs/cookieConfig.js`)
- Added `__Secure-` prefix for cookie names
- Updated domain validation to handle cross-domain cookies
- Ensured `SameSite=None` and `Secure=true` for production environments
- Added detailed validation and error handling
- Improved debug logging

### 2. Authentication Routes (`server/src/routes/authRouter.js`)
- Updated cookie names to use the `__Secure-` prefix
- Added Cache-Control headers to prevent caching issues
- Enhanced error handling for cookie operations
- Added detailed logging for cookie domain validation
- Added cookie validation before setting

### 3. Token Verification (`server/src/middlewares/verifyRefreshToken.js`)
- Updated to handle the new cookie prefix
- Added validation for secure connections
- Enhanced error handling and logging
- Added detailed validation for cookie domain matching

### 4. Token Router (`server/src/routes/tokensRouter.js`)
- Updated cookie names to use the new prefix
- Enhanced error handling for token operations

### 5. CORS Configuration (`server/src/app.js`)
- Ensured CORS is properly configured for cross-domain requests
- Added detailed error logging for CORS issues

## Deployment Instructions

### Backend (Render)

1. Update environment variables in Render:
   ```
   NODE_ENV=production
   IS_RENDER=true
   FRONTEND_DOMAIN=pipeline-fittings-store-client.vercel.app
   COOKIE_DOMAIN=pipeline-fittings-store-client.vercel.app
   CLIENT_URL=https://pipeline-fittings-store-client.vercel.app
   COOKIE_SAME_SITE=none
   COOKIE_SECURE=true
   COOKIE_HTTP_ONLY=true
   DEBUG_COOKIE_CONFIG=true
   ```

2. Deploy the changes to Render.

3. Monitor the logs for any cookie-related issues.

### Frontend (Vercel)

1. Ensure all API requests include `credentials: 'include'`.

2. Check that your API client is configured to handle cookies properly.

3. Deploy the frontend to Vercel.

## Testing

1. Clear all cookies from your browser before testing.

2. Login with valid credentials.

3. Check the browser's Application tab > Cookies to verify the `__Secure-refreshToken` cookie is set.

4. Refresh the page to ensure your login state persists.

5. Check the Network tab for any CORS errors or missing cookies.

6. Monitor the backend logs for any cookie-related errors.

## Troubleshooting

If you still experience issues:

1. **Cookie Not Set**: 
   - Check if the `Set-Cookie` header is present in the login response
   - Verify that `SameSite=None` and `Secure=true` are set
   - Ensure the domain is configured correctly

2. **Cookie Not Sent**:
   - Verify that `credentials: 'include'` is set on all requests
   - Check if the cookie exists in the browser's storage

3. **CORS Errors**:
   - Check that your backend CORS configuration includes your frontend domain
   - Ensure `credentials: true` is set in the CORS configuration

4. **Refresh Token Not Working**:
   - Check if the token is being properly verified on the backend
   - Verify that the cookie name matches in both setting and verification

## References

- [MDN: SameSite Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
- [MDN: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Express: CORS middleware](https://expressjs.com/en/resources/middleware/cors.html)
- [Render: Environment Variables](https://render.com/docs/environment-variables)