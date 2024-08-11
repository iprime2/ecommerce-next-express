"use client"

import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Load the base URL from the environment variables
// const BASE_URL = process.env.LOCALHOST || 'http://localhost:5000';
const BASE_URL = process.env.LOCALHOST || 'http://ec2-13-235-104-169.ap-south-1.compute.amazonaws.com:5000';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the Bearer token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get the token from local storage or any other storage mechanism
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Wrapper function for making API requests
const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api(config);
    return response.data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export { api, apiRequest };
