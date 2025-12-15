import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Receipt() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load receipt");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) return <h3 className="text-center py-4">Loading receipt...</h3>;
  if (!booking)
    return <h3 className="text-center py-4">Receipt not found</h3>;

  return (
    <main className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="card shadow p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h3 className="text-center mb-3">🎫 Ticket Receipt</h3>
        <hr />

        {/* Booking & Trip Info */}
        <div className="mb-2"><strong>Booking ID:</strong> {booking._id}</div>
        <div className="mb-2">
          <strong>Bus:</strong> {booking.trip?.bus?.busNumber || "-"} / {booking.trip?.bus?.operator || "-"}
        </div>
        <div className="mb-2">
          <strong>Route:</strong> {booking.trip?.route?.startPoint || "-"} → {booking.trip?.route?.endPoint || "-"}
        </div>
        <div className="mb-2">
          <strong>Start:</strong>{" "}
          {booking.trip?.departureTime ? new Date(booking.trip.departureTime).toLocaleString() : "-"}
        </div>
        <div className="mb-2">
          <strong>End:</strong>{" "}
          {booking.trip?.arrivalTime ? new Date(booking.trip.arrivalTime).toLocaleString() : "-"}
        </div>

        {/* Booking Details */}
        <div className="mb-2"><strong>Seats Booked:</strong> {booking.seatsBooked?.join(", ") || "-"}</div>
        <div className="mb-2"><strong>Total Amount:</strong> ₹{booking.totalAmount ?? 0}</div>
        <div className="mb-2">
          <strong>Payment Status:</strong>{" "}
          <span className={
            booking.paymentStatus === "paid" ? "text-success fw-bold" :
            booking.paymentStatus === "pending" ? "text-warning fw-bold" : "text-danger fw-bold"
          }>
            {booking.paymentStatus?.charAt(0).toUpperCase() + booking.paymentStatus?.slice(1)}
          </span>
        </div>
        <div className="mb-2">
          <strong>Ticket Status:</strong>{" "}
          <span className={
            booking.ticketStatus === "confirmed" ? "text-success fw-bold" :
            booking.ticketStatus === "cancelled" ? "text-danger fw-bold" : "text-secondary fw-bold"
          }>
            {booking.ticketStatus?.charAt(0).toUpperCase() + booking.ticketStatus?.slice(1)}
          </span>
        </div>
        <div className="mb-2">
          <strong>Booking Date:</strong>{" "}
          {booking.bookingDate ? new Date(booking.bookingDate).toLocaleString() : "-"}
        </div>

        {/* Print Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => window.print()}
          >
            🖨️ Print Receipt
          </button>
        </div>
      </div>
    </main>
  );
}
