// import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/payment.css"; // 👈 UI only

export default function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const token = localStorage.getItem("token");

  /* ===== LOGIC UNCHANGED ===== */
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Booking not found");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId, token]);

  const handlePayment = async () => {
    if (!booking) return;
    setProcessing(true);

    try {
      await api.post(
        `/payments`,
        {
          bookingId,
          amount: booking.totalAmount,
          transactionId: "TXN" + Date.now(),
          paymentMethod,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Payment successful!");
      setTimeout(() => navigate("/passenger/bookings"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return <h3 className="text-center py-4">Loading payment...</h3>;

  if (!booking)
    return (
      <div className="alert alert-danger text-center">
        Booking not found
      </div>
    );

  return (
    <main className="container py-4 payment-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* HEADER */}
      <div className="payment-header">
        <button
          className="btn btn-light me-2"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h4 className="mb-0">Complete Payment</h4>
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="payment-card">
        <h6 className="text-muted mb-2">Trip Summary</h6>
        <div className="summary-row">
          <span>Seats</span>
          <strong>{booking.seatsBooked.join(", ")}</strong>
        </div>
        <div className="summary-row">
          <span>Total Amount</span>
          <strong className="text-success">
            ₹{booking.totalAmount}
          </strong>
        </div>
      </div>

      {/* PAYMENT METHODS */}
      <div className="payment-card">
        <h6 className="text-muted mb-2">Payment Method</h6>

        {["upi", "card", "netbanking", "cash"].map((method) => (
          <label
            key={method}
            className={`payment-option ${
              paymentMethod === method ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="text-capitalize">{method}</span>
          </label>
        ))}
      </div>

      {/* PAY BUTTON */}
      <button
        className="btn btn-success pay-btn"
        onClick={handlePayment}
        disabled={processing}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </main>
  );
}
