import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const getHalls = () => axiosInstance.get("/halls");
export const getHall = (id) => axiosInstance.get(`/halls/${id}`);
export const createBooking = (payload) => axiosInstance.post("/bookings", payload);
export const getBookings = () => axiosInstance.get("/bookings");
export const getBookingsForHall = (hallId) => axiosInstance.get(`/bookings/hall/${hallId}`);
export const approveBooking = (id) => axiosInstance.put(`/admin/bookings/${id}/approve`);
export const rejectBooking = (id) => axiosInstance.put(`/admin/bookings/${id}/reject`);
