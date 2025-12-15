// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axiosInstance";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function BookNow() {
//   const { tripId } = useParams();
//   const navigate = useNavigate();

//   const [trip, setTrip] = useState(null);
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const tripRes = await api.get(`/trips/${tripId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setTrip(tripRes.data);

//         const bookedRes = await api.get(`/bookings/booked-seats/${tripId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setBookedSeats(bookedRes.data.bookedSeats || []);
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to load trip");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [tripId, token]);

//   const handleSeatClick = (seat) => {
//     if (bookedSeats.includes(seat)) return;
//     setSelectedSeats(prev =>
//       prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
//     );
//   };

//   const handleBookSeats = async () => {
//     if (!selectedSeats.length) return toast.warning("Select at least 1 seat");

//     try {
//       const totalAmount = trip.pricePerSeat * selectedSeats.length;

//       // Create booking
//       const res = await api.post(
//         `/bookings`,
//         { trip: trip._id, seatsBooked: selectedSeats, totalAmount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Booking successful 🎉");

//       // Navigate to Payment page with booking ID
//       navigate(`/passenger/payment/${res.data._id}`);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Booking failed");
//     }
//   };

//   if (loading) return <h4 className="text-center py-5">Loading trip...</h4>;
//   if (!trip) return <h4 className="text-center text-danger">Trip not found</h4>;

//   return (
//     <main className="container py-4" style={{ maxWidth: "900px" }}>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>← Back</button>
//         <h3 className="fw-bold text-primary">Book Your Seat</h3>
//       </div>

//       {/* Trip Details */}
//       <div className="card shadow mb-4">
//         <div className="card-body d-flex justify-content-between">
//           <div>
//             <h5 className="fw-bold">{trip.bus.busNumber}</h5>
//             <p className="mb-1"><strong>From:</strong> {trip.route.startPoint} → <strong>To:</strong> {trip.route.endPoint}</p>
//             <p className="m-0"><strong>Fare/Seat:</strong> ₹{trip.pricePerSeat}</p>
//           </div>
//           <div className="text-end">
//             <span className="badge bg-danger me-2">Booked: {bookedSeats.length}</span>
//             <span className="badge bg-warning text-dark">Selected: {selectedSeats.length}</span>
//           </div>
//         </div>
//       </div>

//       {/* Seat Legend */}
//       <div className="d-flex justify-content-center gap-3 mb-3">
//         <span className="badge bg-primary">Available</span>
//         <span className="badge bg-warning text-dark">Selected</span>
//         <span className="badge bg-danger">Booked</span>
//       </div>

//       {/* Seat Layout */}
//       <div className="card shadow-sm p-4 text-center">
//         <h6 className="fw-bold text-secondary mb-3">🚌 Driver Front</h6>
//         <div className="d-grid gap-3 mx-auto" style={{ gridTemplateColumns: "repeat(4, 65px)" }}>
//           {trip.bus.seatLayout.map(({ seatNumber }) => {
//             const isBooked = bookedSeats.includes(seatNumber);
//             const isSelected = selectedSeats.includes(seatNumber);

//             return (
//               <button
//                 key={seatNumber}
//                 disabled={isBooked}
//                 onClick={() => handleSeatClick(seatNumber)}
//                 className="btn fw-bold"
//                 style={{
//                   height: "55px",
//                   backgroundColor: isBooked ? "#dc3545" : isSelected ? "#ffc107" : "#0d6efd",
//                   color: "white",
//                   cursor: isBooked ? "not-allowed" : "pointer",
//                   opacity: isBooked ? 0.5 : 1
//                 }}
//               >
//                 {seatNumber}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-4 text-center">
//         <h5 className="fw-bold">
//           Total Price: <span className="text-success">₹{trip.pricePerSeat * selectedSeats.length}</span>
//         </h5>
//         <button
//           className="btn btn-lg btn-success mt-3"
//           disabled={!selectedSeats.length}
//           onClick={handleBookSeats}
//         >
//           Proceed to Payment 💳
//         </button>
//       </div>
//     </main>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/seat.css"; // 👈 only UI

export default function BookNow() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ================= FETCH DATA (UNCHANGED) ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripRes = await api.get(`/trips/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrip(tripRes.data);

        const bookedRes = await api.get(
          `/bookings/booked-seats/${tripId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookedSeats(bookedRes.data.bookedSeats || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load trip");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId, token]);

  /* ================= SEAT CLICK (UNCHANGED) ================= */
  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBookSeats = async () => {
    if (!selectedSeats.length) return toast.warning("Select at least 1 seat");

    try {
      const totalAmount = trip.pricePerSeat * selectedSeats.length;

      const res = await api.post(
        `/bookings`,
        { trip: trip._id, seatsBooked: selectedSeats, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Booking successful 🎉");
      navigate(`/passenger/payment/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <h4 className="text-center py-5">Loading trip...</h4>;
  if (!trip) return <h4 className="text-center text-danger">Trip not found</h4>;

  /* ================= LOWER / UPPER DECK (VISUAL ONLY) ================= */
  const allSeats = trip.bus.seatLayout.map((s) => s.seatNumber);
  const mid = Math.ceil(allSeats.length / 2);

  const lowerDeckSeats = allSeats.slice(0, mid);
  const upperDeckSeats = allSeats.slice(mid);

  const renderSeat = (seat) => {
    const isBooked = bookedSeats.includes(seat);
    const isSelected = selectedSeats.includes(seat);

    let cls = "seat";
    if (isBooked) cls += " booked";
    else if (isSelected) cls += " selected";

    return (
      <div key={seat} className={cls} onClick={() => handleSeatClick(seat)}>
        {seat}
      </div>
    );
  };

  return (
    <main className="container py-3" style={{ maxWidth: "900px" }}>
      <ToastContainer />

      {/* ================= HEADER ================= */}
      <div className="d-flex align-items-center mb-3">
        <button className="btn btn-light me-2" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="route-header">
          <h5 className="mb-0">Select Seats</h5>
          <small>
            {trip.route.startPoint} → {trip.route.endPoint}
          </small>
        </div>
      </div>

      {/* ================= DECKS ================= */}
      <div className="seat-wrapper">
        {/* LOWER DECK */}
        <div className="deck">
          <h6 className="deck-title">
            Lower Deck <span className="steering">🛞</span>
          </h6>
          <div className="seat-grid">
            {lowerDeckSeats.map(renderSeat)}
          </div>
        </div>

        {/* UPPER DECK */}
        <div className="deck">
          <h6 className="deck-title">Upper Deck</h6>
          <div className="seat-grid">
            {upperDeckSeats.map(renderSeat)}
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="footer-bar">
        <div>
          <strong>
            ₹{trip.pricePerSeat * selectedSeats.length}
          </strong>
          <div className="text-muted small">
            {selectedSeats.length} seat(s) selected
          </div>
        </div>

        <button
          disabled={!selectedSeats.length}
          className="btn btn-success"
          onClick={handleBookSeats}
        >
          Proceed to Payment 💳
        </button>
      </div>
    </main>
  );
}
