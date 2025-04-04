# Frontend Cross-Domain Cookie Guide

This guide explains how to properly configure your frontend application to work with cross-domain cookies from your Render backend.

## Fetch Requests

All API requests to your backend must include `credentials: 'include'` to send and receive cookies:

```javascript
// Example fetch request with credentials
const fetchData = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      credentials: 'include', // This is essential for cross-domain cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
```

## Axios Configuration

If you're using Axios, configure it to include credentials:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://your-render-backend.onrender.com',
  withCredentials: true, // This is essential for cross-domain cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

## Cookie Storage Check

You can add a debug utility to check if cookies are being properly stored:

```javascript
const checkCookies = () => {
  console.log('All cookies:', document.cookie);
  
  // Note: HttpOnly cookies won't be visible via document.cookie
  // but this can help debug non-HttpOnly cookies
  
  console.log('Login status based on access token in memory:', 
    Boolean(localStorage.getItem('accessToken')));
};
```

## CORS Issues

If you encounter CORS issues:

1. Check the browser console for specific error messages
2. Verify that your backend CORS configuration includes your frontend domain
3. Ensure all requests include `credentials: 'include'`
4. Check that your backend sets the appropriate CORS headers

## Testing Login Flow

To test the authentication flow:

1. Clear all cookies and local storage before testing
2. Login with valid credentials
3. Check the Network tab to see the Set-Cookie header in the response
4. Refresh the page to verify that your authentication state persists
5. Check the Application tab > Cookies to see if the refresh token cookie exists

## Handling Cookie Errors

Add error handling for cases where cookies might not be properly set:

```javascript
const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    // Store access token in memory or localStorage
    localStorage.setItem('accessToken', response.data.accessToken);
    
    // Check if cookie status was reported by the backend
    if (response.data.cookieStatus === 'error') {
      console.warn('Cookie setting error:', response.data.cookieError);
      // Implement fallback authentication mechanism
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
```

## Security Best Practices

1. Store access tokens in memory rather than localStorage when possible
2. Implement token refresh logic to handle expired access tokens
3. Add logout functionality that clears both cookies and local storage
4. Use HTTPS for all communications
5. Implement proper error handling for authentication failures