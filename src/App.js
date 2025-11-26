import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import BookingForm from "./pages/BookingForm";
import PaymentPage from "./pages/PaymentPage";
import HallDetails from "./pages/HallDetails";
import Register from "./pages/Register"; // Import the Register component
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hall/:id" element={<HallDetails />} />
            <Route path="/book/:hallId" element={<BookingForm />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/register" element={<Register />} /> {/* Add Register Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="ROLE_ADMIN">
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
