# Deployment and Testing Guide for Cross-Domain Cookie Fix

## Overview

This guide provides step-by-step instructions for deploying and testing the cross-domain cookie fixes between your Render backend and Vercel frontend.

## Deployment Steps

### 1. Backend (Render)

1. **Update Environment Variables**:
   - Go to your Render dashboard
   - Navigate to your service
   - Add/update these environment variables:
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

2. **Deploy the Changes**:
   - Commit and push all changes to your repository
   - Render should automatically redeploy your service
   - If not, manually trigger a deploy from the Render dashboard

3. **Verify Deployment**:
   - Check the Render logs for any errors
   - Look for the cookie configuration logs
   - Ensure there are no startup errors

### 2. Frontend (Vercel)

1. **Deploy Frontend Changes**:
   - Commit and push all changes to your repository
   - Vercel should automatically deploy your frontend
   - If not, manually trigger a deploy from the Vercel dashboard

2. **Verify Frontend Environment**:
   - Ensure your environment variables are correctly set
   - Check that `VITE_TARGET` points to your Render backend URL

## Testing Procedure

### 1. Preparation

1. **Clear Browser Data**:
   - Open browser DevTools (F12)
   - Go to Application > Storage > Clear Site Data
   - Check "Cookies and site data"
   - Click "Clear"

2. **Open Network Tab**:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Check "Preserve log"

### 2. Login Test

1. **Access the Login Page**:
   - Navigate to your site's login page
   - Fill in valid credentials
   - Submit the form

2. **Check Network Response**:
   - In the Network tab, find the login request
   - Check the Response headers for `Set-Cookie`
   - Verify the cookie has:
     - Name: `__Secure-refreshToken`
     - `SameSite=None`
     - `Secure`
     - `HttpOnly`
     - Domain matching your frontend

3. **Check Cookie Storage**:
   - Go to Application > Cookies
   - Look for the `__Secure-refreshToken` cookie
   - Verify it exists and has the correct attributes

### 3. Authentication Persistence Test

1. **Refresh the Page**:
   - Reload the application
   - Verify you're still logged in

2. **Check Token Refresh**:
   - In the Network tab, find the `/api/tokens/refresh` request
   - Verify it succeeds with a 200 status
   - Check the response contains a new access token

### 4. Logout Test

1. **Perform Logout**:
   - Click the logout button
   - Check the Network tab for the logout request
   - Verify it succeeds

2. **Verify Cookie Removal**:
   - Go to Application > Cookies
   - Verify the `__Secure-refreshToken` cookie is removed

3. **Verify Authentication State**:
   - Refresh the page
   - Verify you're redirected to the login page or shown as logged out

## Troubleshooting

### Cookie Not Set

If the cookie isn't being set after login:

1. **Check Response Headers**:
   - Verify the `Set-Cookie` header is present in the login response
   - Check that the cookie attributes are correct

2. **Check CORS Configuration**:
   - Look for CORS errors in the console
   - Verify the CORS configuration includes your frontend domain

3. **Check Domain Configuration**:
   - Ensure the cookie domain matches your frontend domain
   - Verify that your frontend is using HTTPS (required for Secure cookies)

### Cookie Not Sent

If the cookie exists but isn't being sent with requests:

1. **Check Request Headers**:
   - Verify the Cookie header is present in the request
   - Check that the cookie name is correct

2. **Check Frontend Configuration**:
   - Verify that `withCredentials: true` is set in your API client
   - Check that all requests include credentials

### Token Refresh Issues

If token refresh is failing:

1. **Check Cookie Attributes**:
   - Verify the cookie has the correct name and attributes
   - Check that it's not expired

2. **Check Backend Logs**:
   - Look for token verification errors in the backend logs
   - Check for any domain validation issues

3. **Try Manual Refresh**:
   - Navigate directly to `/api/tokens/refresh` in a new tab
   - Check the response for any error messages

## Final Verification

Once everything is working:

1. **Test Full User Flow**:
   - Login
   - Navigate through protected pages
   - Leave the site open for a while
   - Return and verify you're still authenticated
   - Logout

2. **Test on Different Devices**:
   - Try on mobile devices
   - Test on different browsers
   - Verify consistent behavior across platforms

## Monitoring

After deployment, continue monitoring:

1. **Check Backend Logs**:
   - Monitor for any cookie-related errors
   - Look for token verification failures

2. **Monitor User Feedback**:
   - Watch for reports of users being unexpectedly logged out
   - Monitor for authentication-related issues

3. **Analyze Traffic Patterns**:
   - Check for unusual patterns in authentication requests
   - Monitor token refresh rates