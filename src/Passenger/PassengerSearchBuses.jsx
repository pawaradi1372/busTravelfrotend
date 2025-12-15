// import React, { useEffect, useState } from "react";
// import api from "../api/axiosInstance";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// export default function PassengerSearchBuses() {
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState({ startPoint: "", endPoint: "" });
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetchTrips();
//   }, []);

//   const fetchTrips = async () => {
//     try {
//       let query = "";
//       if (search.startPoint) query += `startPoint=${search.startPoint}&`;
//       if (search.endPoint) query += `endPoint=${search.endPoint}&`;

//       // Fetch trips with populated bus and route
//       const res = await api.get(`/trips?${query}`);
//       setTrips(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch trips");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setSearch({ ...search, [e.target.name]: e.target.value });
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     fetchTrips();
//   };

//   if (loading) return <div className="text-center py-5">Loading trips...</div>;

//   return (
//     <main className="container py-4">
//      <button
//         className="btn btn-secondary mb-3"
//         onClick={() => navigate(-1)} // <-- navigate back
//       >
//         &larr; Back
//       </button>
//       <h3 className="mb-4">Search Trips</h3>

//       {/* Search Form */}
//       <form className="row g-3 mb-4" onSubmit={handleSearch}>
//         <div className="col-md-4">
//           <input
//             type="text"
//             className="form-control"
//             name="startPoint"
//             placeholder="Start Point"
//             value={search.startPoint}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="col-md-4">
//           <input
//             type="text"
//             className="form-control"
//             name="endPoint"
//             placeholder="End Point"
//             value={search.endPoint}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="col-md-2">
//           <button type="submit" className="btn btn-primary w-100">
//             Search
//           </button>
//         </div>
//       </form>

//       {/* Trips Cards */}
//       {trips.length === 0 ? (
//         <div className="alert alert-warning">No trips found.</div>
//       ) : (
//         <div className="row g-3">
//           {trips.map((trip) => (
//             <div className="col-md-4" key={trip._id}>
//               <div className="card h-100 border-primary shadow-sm">
//                 <div className="card-body">
//                   <h5 className="card-title">{trip.bus.busNumber}</h5>
//                   <p className="card-text">
//                     <strong>Route:</strong> {trip.route.startPoint} → {trip.route.endPoint} <br />
//                     <strong>Departure:</strong>{" "}
//                     {new Date(trip.departureTime).toLocaleString()} <br />
//                     <strong>Arrival:</strong> {new Date(trip.arrivalTime).toLocaleString()} <br />
//                     <strong>Price per Seat:</strong> ${trip.pricePerSeat} <br />
//                     <strong>Status:</strong>{" "}
//                     <span className={`badge ${trip.status === "scheduled" ? "bg-success" : "bg-secondary"}`}>
//                       {trip.status}
//                     </span>
//                   </p>
//                   <p className="card-text">
//                      <strong>Operator:</strong> {trip.bus?.operator?.fullName || "N/A"} <br />

//                     <strong>Available Seats:</strong> {trip.bus.availableSeats}
//                   </p>
//                   <button
//                     className="btn btn-primary w-100"
//                     disabled={trip.bus.availableSeats === 0}
//                     onClick={() => navigate(`/passenger/book/${trip._id}`)} // ✅ navigate to BookNow page
//                   >
//                     {trip.bus.availableSeats === 0 ? "Full" : "Book Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }
// src/pages/passenger/PassengerSearchBuses.jsx

// src/pages/passenger/PassengerSearchBuses.jsx


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function PassengerSearchBuses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const startPoint = queryParams.get("startPoint") || "";
  const endPoint = queryParams.get("endPoint") || "";
  const journeyDate = queryParams.get("journeyDate") || "";

  useEffect(() => {
    fetchTrips();
  }, [startPoint, endPoint, journeyDate]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      let query = "";
      if (startPoint) query += `startPoint=${startPoint}&`;
      if (endPoint) query += `endPoint=${endPoint}&`;
      if (journeyDate) query += `journeyDate=${journeyDate}&`;

      const res = await api.get(`/trips?${query}`);
      setTrips(res.data);
    } catch (err) {
      toast.error("Failed to fetch trips",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-fluid py-4">

      {/* HEADER */}
      <div
        className="rounded-4 p-4 mb-4 text-white"
        style={{
          background: "linear-gradient(135deg, #2f6bbeff, #196680ff, #2c5364)",
        }}
      >
        <button
          className="btn btn-light btn-sm mb-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h4 className="fw-bold mb-1">
          {startPoint} → {endPoint}
        </h4>
        <p className="mb-0 opacity-75">
          {journeyDate || "All available trips"}
        </p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
          <p className="mt-2">Searching buses...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="alert alert-warning text-center rounded-4">
          🚫 No buses available for this route
        </div>
      ) : (
        <div className="row g-4">
          {trips.map((trip) => (
            <div className="col-lg-4 col-md-6" key={trip._id}>
              <div
                className="card h-100 border-0 shadow rounded-4"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body">

                  {/* BUS INFO */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">
                      🚌 {trip.bus.busNumber}
                    </h5>
                    <span
                      className={`badge ${
                        trip.status === "scheduled"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>

                  {/* ROUTE */}
                  <p className="mb-2 fw-semibold">
                    {trip.route.startPoint} → {trip.route.endPoint}
                  </p>

                  {/* TIME */}
                  <div className="row text-muted small mb-3">
                    <div className="col-6">
                      <i className="bi bi-clock me-1"></i>
                      {new Date(trip.departureTime).toLocaleTimeString()}
                    </div>
                    <div className="col-6 text-end">
                      {new Date(trip.arrivalTime).toLocaleTimeString()}
                    </div>
                  </div>

                  <hr />

                  {/* FOOTER */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-0 small text-muted">Fare</p>
                      <h5 className="fw-bold text-primary mb-0">
                        ₹{trip.pricePerSeat}
                      </h5>
                    </div>

                    <button
                      className="btn btn-primary rounded-pill px-4"
                      disabled={trip.bus.availableSeats === 0}
                      onClick={() =>
                        navigate(`/passenger/book/${trip._id}`)
                      }
                    >
                      {trip.bus.availableSeats === 0
                        ? "Full"
                        : "Book Now"}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
