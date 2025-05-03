// src/utils/cruxApi.js
import axios from 'axios';

// Access your API key from the .env file
const API_KEY = import.meta.env.VITE_CRUX_API_KEY;

const CRUX_URL = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`;

export const fetchCrUXData = async (origin) => {
  try {
    const response = await axios.post(CRUX_URL, {
      origin: origin,  // Make sure to pass the origin (base URL)
    });
    return { origin, data: response.data };
  } catch (error) {
    console.error('CrUX API error:', error?.response?.data || error.message);
    return { origin, error: true };  // Handle the error response
  }
};

export const fetchMultiple = async (origins) => {
  return Promise.all(origins.map(fetchCrUXData));
};
