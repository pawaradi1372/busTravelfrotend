// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axiosInstance";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function MyBookings() {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancellingId, setCancellingId] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await api.get(`/bookings/my`);
//         setBookings(res.data);
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to fetch bookings");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleCancelBooking = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;

//     try {
//       setCancellingId(bookingId);
//       const res = await api.put(`/bookings/cancel/${bookingId}`);
//       toast.success(res.data.message || "Booking cancelled");

//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === bookingId ? { ...b, ticketStatus: "cancelled" } : b
//         )
//       );
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to cancel booking");
//     } finally {
//       setCancellingId(null);
//     }
//   };

//   if (loading) return <h3 className="text-center py-4">Loading bookings...</h3>;
//   if (!bookings.length) return <h3 className="text-center py-4">No bookings found</h3>;

//   return (
//     <main className="container py-4">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
//         ← Back
//       </button>
//       <h2 className="mb-4 text-center">My Bookings</h2>

//       <div className="row g-4">
//         {bookings.map((b) => (
//           <div key={b._id} className="col-md-6 col-lg-4">
//             <div className="card shadow-sm h-100">
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title mb-2">
//   {b.trip?.bus?.busNumber || "-"} / {b.trip?.bus?.operator?.fullName || "N/A"} <br />
// </h5>


//                 <p className="mb-1">
//                   <strong>Route:</strong> {b.trip?.route?.startPoint || "-"} → {b.trip?.route?.endPoint || "-"}
//                 </p>

//                 <p className="mb-1">
//                   <strong>Trip Time:</strong><br/>
//                   {b.trip?.departureTime ? new Date(b.trip.departureTime).toLocaleString() : "-"} <br/>
//                   {b.trip?.arrivalTime ? new Date(b.trip.arrivalTime).toLocaleString() : "-"}
//                 </p>

//                 <p className="mb-1">
//                   <strong>Booking Time:</strong> {b.bookingDate ? new Date(b.bookingDate).toLocaleString() : "-"}
//                 </p>

//                 <p className="mb-1">
//                   <strong>Seats:</strong> {b.seatsBooked?.join(", ") || "-"}
//                 </p>

//                 <p className="mb-1">
//                   <strong>Total & Payment:</strong> ₹{b.totalAmount ?? 0} <br />
//                   <span className={
//                     b.paymentStatus === "paid" ? "text-success fw-bold" :
//                     b.paymentStatus === "pending" ? "text-warning fw-bold" :
//                     "text-danger fw-bold"
//                   }>
//                     {b.paymentStatus?.charAt(0).toUpperCase() + b.paymentStatus?.slice(1)}
//                   </span>
//                 </p>

//                 <p className={
//                   b.ticketStatus === "confirmed" ? "text-success fw-bold" :
//                   b.ticketStatus === "cancelled" ? "text-danger fw-bold" :
//                   "text-secondary fw-bold"
//                 }>
//                   <strong>Ticket Status:</strong> {b.ticketStatus?.charAt(0).toUpperCase() + b.ticketStatus?.slice(1)}
//                 </p>

//                 <div className="mt-auto d-flex flex-column gap-2">
//                   {b.paymentStatus === "pending" && b.ticketStatus !== "cancelled" && (
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => navigate(`/passenger/payment/${b._id}`)}
//                     >
//                       Pay Now
//                     </button>
//                   )}
//                   {b.paymentStatus === "paid" && (
//                     <button
//                       className="btn btn-sm btn-success"
//                       onClick={() => navigate(`/passenger/bookings/receipt/${b._id}`)}
//                     >
//                       View Receipt
//                     </button>
//                   )}
//                   {b.ticketStatus !== "cancelled" && (
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleCancelBooking(b._id)}
//                       disabled={cancellingId === b._id}
//                     >
//                       {cancellingId === b._id ? "Cancelling..." : "Cancel Booking"}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/bookings.css";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get(`/bookings/my`);
        setBookings(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setCancellingId(bookingId);
      const res = await api.put(`/bookings/cancel/${bookingId}`);
      toast.success(res.data.message || "Booking cancelled");

      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, ticketStatus: "cancelled" } : b
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading)
    return <h3 className="text-center py-4">Loading bookings...</h3>;
  if (!bookings.length)
    return <h3 className="text-center py-4">No bookings found</h3>;

  return (
    <main className="container py-4 my-bookings-container">
      <ToastContainer position="top-right" autoClose={3000} />
<button className="btn btn-light me-2" onClick={() => navigate('/')}>
          ←
        </button>
      <h2 className="mb-4 text-center fw-bold">My Bookings</h2>

      <div className="row g-4">
        {bookings.map((b) => (
          <div key={b._id} className="col-md-6 col-lg-4">
            <div className="booking-card shadow-sm">
              <div className="booking-header">
                <h5>{b.trip?.bus?.busNumber || "-"}</h5>
                <small>{b.trip?.bus?.operator?.fullName || "Operator N/A"}</small>
              </div>

              <div className="booking-route mt-2">
                <span className="badge bg-primary">
                  {b.trip?.route?.startPoint || "-"} → {b.trip?.route?.endPoint || "-"}
                </span>
              </div>

              <div className="booking-info mt-3">
                <p><strong>Seats:</strong> {b.seatsBooked?.join(", ") || "-"}</p>
                <p><strong>Trip:</strong> {b.trip?.departureTime ? new Date(b.trip.departureTime).toLocaleString() : "-"} → {b.trip?.arrivalTime ? new Date(b.trip.arrivalTime).toLocaleString() : "-"}</p>
                <p><strong>Booking:</strong> {b.bookingDate ? new Date(b.bookingDate).toLocaleString() : "-"}</p>
                <p><strong>Total:</strong> ₹{b.totalAmount ?? 0}</p>

                <div className="d-flex gap-2 flex-wrap mt-2">
                  <span className={`badge ticket-status ${b.ticketStatus}`}>{b.ticketStatus?.toUpperCase()}</span>
                  <span className={`badge payment-status ${b.paymentStatus}`}>{b.paymentStatus?.toUpperCase()}</span>
                </div>
              </div>

              <div className="booking-actions mt-3 d-flex flex-column gap-2">
                {b.paymentStatus === "pending" && b.ticketStatus !== "cancelled" && (
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate(`/passenger/payment/${b._id}`)}
                  >
                    Pay Now
                  </button>
                )}
                {b.paymentStatus === "paid" && (
                  <button
                    className="btn btn-success w-100"
                    onClick={() => navigate(`/passenger/bookings/receipt/${b._id}`)}
                  >
                    View Receipt
                  </button>
                )}
                {b.ticketStatus !== "cancelled" && (
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => handleCancelBooking(b._id)}
                    disabled={cancellingId === b._id}
                  >
                    {cancellingId === b._id ? "Cancelling..." : "Cancel Booking"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
