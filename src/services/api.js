import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

const API = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

// Attach token automatically to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// -------------------- AUTH --------------------
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// -------------------- HALLS --------------------
export const getHalls = () => API.get("/halls");
export const getHall = (id) => API.get(`/halls/${id}`);
export const createHall = (data) => API.post("/halls", data);

// -------------------- BOOKINGS --------------------
export const createBooking = (data) => API.post("/bookings", data);
export const getBookings = () => API.get("/bookings");
export const getBookingsForHall = (hallId, date) =>
  API.get(`/bookings/hall/${hallId}`, { params: date ? { date } : {} });

// -------------------- FILES --------------------
export const uploadDocument = (bookingId, file, docType = "ID_PROOF") => {
  const form = new FormData();
  form.append("file", file);
  form.append("docType", docType);
  return API.post(`/files/upload/booking/${bookingId}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getFilesForBooking = (bookingId) =>
  API.get(`/files/booking/${bookingId}`);

// -------------------- ADMIN ACTIONS --------------------
export const approveBooking = (id) => API.put(`/admin/bookings/${id}/approve`);
export const rejectBooking = (id) => API.put(`/admin/bookings/${id}/reject`);
export const checkBooking = (id) => API.put(`/admin/bookings/${id}/check`);

// -------------------- PAYMENT --------------------
export const payBooking = (bookingId, paymentRef) =>
  API.post(`/payment/pay/${bookingId}`, null, { params: { paymentRef } });

// -------------------- REPORTS --------------------
export const getBookingsByDate = (date) =>
  API.get("/reports/by-date", { params: { date } });

export const getRevenue = (from, to) =>
  API.get("/reports/revenue", { params: { from, to } });

export default API;
