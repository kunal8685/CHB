import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Auto attach JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

/* --------------------------- DOCUMENT UPLOAD APIs ---------------------------- */

// Upload a document for a booking
export const uploadDocument = (bookingId, file) => {
  const form = new FormData();
  form.append("file", file);

  return axiosInstance.post(`/bookings/${bookingId}/upload`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get all uploaded documents for a booking
export const getDocumentsForBooking = (bookingId) =>
  axiosInstance.get(`/bookings/${bookingId}/documents`);

/* --------------------------- BOOKING APIs ---------------------------- */

// Fetch all halls
export const getHalls = () => axiosInstance.get("/halls");

// Fetch a specific hall by ID
export const getHall = (id) => axiosInstance.get(`/halls/${id}`);

// Create a new booking
export const createBooking = (data) => axiosInstance.post("/bookings", data);

// Fetch all bookings
export const getBookings = () => axiosInstance.get("/bookings");

// Fetch bookings for a specific hall
export const getBookingsForHall = (hallId) =>
  axiosInstance.get(`/bookings/hall/${hallId}`);

// Approve a booking
export const approveBooking = (id) =>
  axiosInstance.put(`/admin/bookings/${id}/approve`);

// Reject a booking
export const rejectBooking = (id) =>
  axiosInstance.put(`/admin/bookings/${id}/reject`);

/* --------------------------- AUTH APIs ---------------------------- */

// Register a new user
export const registerUser = (data) =>
  axiosInstance.post("/auth/register", data);

// Login a user
export const loginUser = (data) => axiosInstance.post("/auth/login", data);
