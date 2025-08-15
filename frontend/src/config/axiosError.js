import axios from 'axios';

// Function called when the response is successful
const success = res => res;

// Function called when the response returns an error
const error = err => {
    // If the error is 401 (Unauthorized), meaning the token is expired or invalid
    if (401 === err.response.status) {
        // Redirect the user to the home page (or login page)
        // eslint-disable-next-line no-undef
        window.location = '/';
    } else {
        // For other types of errors, reject the promise so they can be handled elsewhere
        // eslint-disable-next-line no-undef
        return Promise.reject(err);
    }
};
// Register the Axios response interceptor
// - 'success' handles successful responses (just returns the response)
// - 'error' handles failed responses (like 401 errors, expired tokens, etc.)
axios.interceptors.response.use(success, error);