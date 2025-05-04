import axios from 'axios';
const API_KEY = import.meta.env.VITE_CRUX_API_KEY;

const CRUX_URL = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`;

export const fetchCrUXData = async (origin) => {
  try {
    const response = await axios.post(CRUX_URL, {
      origin: origin,  
    });
    return { origin, data: response.data };
  } catch (error) {
    console.error('CrUX API error:', error?.response?.data || error.message);
    return { origin, error: true }; 
  }
};

export const fetchMultiple = async (origins) => {
  return Promise.all(origins.map(fetchCrUXData));
};
