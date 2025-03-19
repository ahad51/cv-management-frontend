import axios from "axios";

const API_URL = "http://localhost:5001"; // Ensure this matches your backend port

// Get token from localStorage (modify if using sessionStorage or cookies)
const getToken = () => {
  return localStorage.getItem("token");
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Needed if using cookies for authentication
    });
    console.log("Register Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Remove this if backend doesn't use cookies
    });

    console.log("Full Login Response:", response);
    console.log("Login Data:", response.data);

    if (!response.data || !response.data.token) {
      throw new Error("Token missing in response");
    }

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response || error);
    throw error;
  }
};


export const fetchCVs = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found. User may not be logged in.");
    throw new Error("Unauthorized: No token provided.");
  }

  try {
    console.log("Fetching CVs with Token:", token);
    const response = await axios.get(`${API_URL}/cv`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fetch CVs Error:", error.response?.data || error.message);
    throw error;
  }
};

export const createCV = async (cvData) => {
  const token = getToken();
  if (!token) {
    console.error("No token found. User may not be logged in.");
    throw new Error("Unauthorized: No token provided.");
  }

  try {
    console.log("Creating CV with Token:", token);
    const response = await axios.post(`${API_URL}/cv`, cvData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Create CV Error:", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  console.log("User logged out, token removed.");
};
