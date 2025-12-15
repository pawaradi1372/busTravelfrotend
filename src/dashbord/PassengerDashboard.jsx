// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axiosInstance";
// import { toast } from "react-toastify";

// const PASSENGER_CONFIG = {
//   title: "Welcome to Passenger Dashboard",
//   subtitle: "Book buses and manage your trips",
//   stats: [
//     { label: "My Bookings", value: 0, change: "Total", icon: "bi-ticket", bg: "bg-primary" },
//     { label: "Upcoming Trips", value: 0, change: "Scheduled", icon: "bi-calendar", bg: "bg-info" },
//     { label: "Amount Spent", value: "₹0", change: "All time", icon: "bi-cash", bg: "bg-success" },
//     { label: "Completed Trips", value: 0, change: "History", icon: "bi-check-circle", bg: "bg-warning" },
//   ],
//   cards: [
//     { title: "My Bookings", path: "/passenger/bookings" },

//   ],
// };

// export default function PassengerDashboard() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState({ startPoint: "", endPoint: "", journeyDate: "" });
//   const [stats, setStats] = useState(PASSENGER_CONFIG.stats);
//   const [suggestions, setSuggestions] = useState({ startPoint: [], endPoint: [] });

//   // Refs for detecting click outside
//   const fromRef = useRef(null);
//   const toRef = useRef(null);

//   // Close suggestions when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (fromRef.current && !fromRef.current.contains(event.target)) {
//         setSuggestions(prev => ({ ...prev, startPoint: [] }));
//       }
//       if (toRef.current && !toRef.current.contains(event.target)) {
//         setSuggestions(prev => ({ ...prev, endPoint: [] }));
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Fetch passenger bookings for stats
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await api.get("/bookings/my");
//         const bookings = res.data || [];
//         setStats([
//           { ...stats[0], value: bookings.length },
//           { ...stats[1], value: bookings.filter(b => new Date(b.trip.departureTime) > new Date()).length },
//           { ...stats[2], value: `₹${bookings.reduce((acc, b) => acc + b.totalAmount, 0)}` },
//           { ...stats[3], value: bookings.filter(b => new Date(b.trip.departureTime) < new Date()).length },
//         ]);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch bookings");
//       }
//     };
//     fetchBookings();
//   }, []);

//   // Fetch suggestions for startPoint / endPoint
//   const fetchSuggestions = async (field, query) => {
//     if (!query) return setSuggestions(prev => ({ ...prev, [field]: [] }));
//     try {
//       const res = await api.get(`/trips/suggestions?field=${field}&query=${query}`);
//       setSuggestions(prev => ({ ...prev, [field]: res.data }));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSearch = () => {
//     if (!search.startPoint || !search.endPoint) {
//       toast.error("Please enter both From and To cities");
//       return;
//     }
//     const params = new URLSearchParams(search).toString();
//     navigate(`/passenger/search?${params}`);
//   };

//   return (
//     <main className="container-fluid px-4 py-3">

//       {/* Header */}
//       <div className="mb-4">
//         <h4 className="fw-bold">{PASSENGER_CONFIG.title}</h4>
//         <p className="text-muted mb-0">{PASSENGER_CONFIG.subtitle}</p>
//       </div>

//       {/* Search Bar */}
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body">
//           <div className="row g-3 align-items-end">

//             {/* From */}
//             <div className="col-md-3 position-relative" ref={fromRef}>
//               <label className="form-label small text-muted">From</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="City / Location"
//                 value={search.startPoint}
//                 onChange={(e) => {
//                   setSearch({ ...search, startPoint: e.target.value });
//                   fetchSuggestions("startPoint", e.target.value);
//                 }}
//               />
//               {suggestions.startPoint.length > 0 && (
//                 <ul className="list-group position-absolute w-100 z-3">
//                   {suggestions.startPoint.map((s, i) => (
//                     <li key={i} className="list-group-item list-group-item-action"
//                         onClick={() => {
//                           setSearch({ ...search, startPoint: s });
//                           setSuggestions(prev => ({ ...prev, startPoint: [] })); // close dropdown
//                         }}>
//                       {s}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {/* To */}
//             <div className="col-md-3 position-relative" ref={toRef}>
//               <label className="form-label small text-muted">To</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Destination"
//                 value={search.endPoint}
//                 onChange={(e) => {
//                   setSearch({ ...search, endPoint: e.target.value });
//                   fetchSuggestions("endPoint", e.target.value);
//                 }}
//               />
//               {suggestions.endPoint.length > 0 && (
//                 <ul className="list-group position-absolute w-100 z-3">
//                   {suggestions.endPoint.map((s, i) => (
//                     <li key={i} className="list-group-item list-group-item-action"
//                         onClick={() => {
//                           setSearch({ ...search, endPoint: s });
//                           setSuggestions(prev => ({ ...prev, endPoint: [] })); // close dropdown
//                         }}>
//                       {s}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {/* Journey Date */}
//             <div className="col-md-3">
//               <label className="form-label small text-muted">Journey Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 value={search.journeyDate}
//                 onChange={(e) => setSearch({ ...search, journeyDate: e.target.value })}
//               />
//             </div>

//             <div className="col-md-3 d-grid">
//               <button className="btn btn-primary" onClick={handleSearch}>
//                 <i className="bi bi-search me-2"></i> Search Buses
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="row g-4 mb-4">
//         {stats.map((s, i) => (
//           <div className="col-xl-3 col-md-6" key={i}>
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body d-flex align-items-center justify-content-between">
//                 <div>
//                   <p className="text-muted mb-1 small">{s.label}</p>
//                   <h5 className="fw-bold mb-1">{s.value}</h5>
//                   <span className="text-muted small">{s.change}</span>
//                 </div>
//                 <div className={`rounded-circle d-flex align-items-center justify-content-center text-white ${s.bg}`} style={{ width: 48, height: 48 }}>
//                   <i className={`bi ${s.icon} fs-4`} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Action Cards */}
//       <div className="row g-4">
//         {PASSENGER_CONFIG.cards.map((c, i) => (
//           <div className="col-md-4" key={i}>
//             <div className="card border-0 shadow-sm text-center h-100" style={{ cursor: "pointer" }} onClick={() => navigate(c.path)}>
//               <div className="card-body d-flex align-items-center justify-content-center">
//                 <h6 className="fw-semibold mb-0">{c.title}</h6>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </main>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";

const PASSENGER_CONFIG = {
  title: "Welcome to Passenger Dashboard",
  subtitle: "Book buses and manage your trips",
  stats: [
    {
      label: "My Bookings",
      value: 0,
      change: "Total",
      icon: "bi-ticket",
      bg: "bg-primary",
    },
    {
      label: "Upcoming Trips",
      value: 0,
      change: "Scheduled",
      icon: "bi-calendar",
      bg: "bg-info",
    },
    {
      label: "Amount Spent",
      value: "₹0",
      change: "All time",
      icon: "bi-cash",
      bg: "bg-success",
    },
    {
      label: "Completed Trips",
      value: 0,
      change: "History",
      icon: "bi-check-circle",
      bg: "bg-warning",
    },
  ],
  cards: [{ title: "My Bookings", path: "/passenger/bookings" }],
};

export default function PassengerDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    startPoint: "",
    endPoint: "",
    journeyDate: "",
  });
  const [stats, setStats] = useState(PASSENGER_CONFIG.stats);
  const [suggestions, setSuggestions] = useState({
    startPoint: [],
    endPoint: [],
  });

  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target))
        setSuggestions((prev) => ({ ...prev, startPoint: [] }));
      if (toRef.current && !toRef.current.contains(event.target))
        setSuggestions((prev) => ({ ...prev, endPoint: [] }));
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        const bookings = res.data || [];
        setStats([
          { ...stats[0], value: bookings.length },
          {
            ...stats[1],
            value: bookings.filter(
              (b) => new Date(b.trip.departureTime) > new Date()
            ).length,
          },
          {
            ...stats[2],
            value: `₹${bookings.reduce((acc, b) => acc + b.totalAmount, 0)}`,
          },
          {
            ...stats[3],
            value: bookings.filter(
              (b) => new Date(b.trip.departureTime) < new Date()
            ).length,
          },
        ]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch bookings");
      }
    };
    fetchBookings();
  }, []);

  const fetchSuggestions = async (field, query) => {
    if (!query) return setSuggestions((prev) => ({ ...prev, [field]: [] }));
    try {
      const res = await api.get(
        `/trips/suggestions?field=${field}&query=${query}`
      );
      setSuggestions((prev) => ({ ...prev, [field]: res.data }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    if (!search.startPoint || !search.endPoint) {
      toast.error("Please enter both From and To cities");
      return;
    }
    const params = new URLSearchParams(search).toString();
    navigate(`/passenger/search?${params}`);
  };

  return (
    <main className="container-fluid py-4">
      {/* Header */}
      <div className="mb-5 text-center">
        <h3 className="fw-bold">{PASSENGER_CONFIG.title}</h3>
        <p className="text-secondary">{PASSENGER_CONFIG.subtitle}</p>
      </div>
{/* Search Card */}
<div
  className="card shadow-lg rounded-4 mb-5 mx-auto"
  style={{
    backgroundColor: "#106dcaff",
    boxShadow: "0 8px 24px rgba(16, 109, 202, 0.3)",
    height: "220px",
    width: "85%",
  }}
>
  <div className="card-body p-4">
    <div className="row g-4 align-items-end">

      {/* From */}
      <div className="col-md-3 position-relative" ref={fromRef}>
        <label className="form-label small text-light fw-semibold">From</label>
        <input
          type="text"
          className="form-control rounded-pill py-2"
          placeholder="City / Location"
          style={{ backgroundColor: "#e3f2fd" }}
          value={search.startPoint}
          onChange={(e) => {
            setSearch({ ...search, startPoint: e.target.value });
            fetchSuggestions("startPoint", e.target.value);
          }}
        />
        {suggestions.startPoint.length > 0 && (
          <ul className="list-group position-absolute w-100 shadow-sm rounded-3 z-3">
            {suggestions.startPoint.map((s, i) => (
              <li
                key={i}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setSearch({ ...search, startPoint: s });
                  setSuggestions((prev) => ({ ...prev, startPoint: [] }));
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* To */}
      <div className="col-md-3 position-relative" ref={toRef}>
        <label className="form-label small text-light fw-semibold">To</label>
        <input
          type="text"
          className="form-control rounded-pill py-2"
          placeholder="Destination"
          value={search.endPoint}
          onChange={(e) => {
            setSearch({ ...search, endPoint: e.target.value });
            fetchSuggestions("endPoint", e.target.value);
          }}
        />
        {suggestions.endPoint.length > 0 && (
          <ul className="list-group position-absolute w-100 shadow-sm rounded-3 z-3">
            {suggestions.endPoint.map((s, i) => (
              <li
                key={i}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setSearch({ ...search, endPoint: s });
                  setSuggestions((prev) => ({ ...prev, endPoint: [] }));
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Journey Date */}
      <div className="col-md-3">
        <label className="form-label small text-light fw-semibold">
          Journey Date
        </label>
        <input
          type="date"
          className="form-control rounded-pill py-2"
          value={search.journeyDate}
          onChange={(e) =>
            setSearch({ ...search, journeyDate: e.target.value })
          }
        />
      </div>

      {/* Search Button */}
      <div className="col-md-3 d-grid">
        <button
          className="btn"
          style={{
            background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
            color: "#fff",
            borderRadius: "50px",
            padding: "10px 0",
            fontWeight: "600",
          }}
          onClick={handleSearch}
        >
          <i className="bi bi-search me-2"></i> Search Buses
        </button>
      </div>
    </div>
  </div>
</div>

{/* Stats Cards */}
<div className="row g-4 mb-5">
  {stats.map((s, i) => (
    <div className="col-xl-3 col-md-6" key={i}>
      <div
        className="card h-100 rounded-4 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
        }}
      >
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <p className="mb-1 small">{s.label}</p>
            <h5 className="fw-bold mb-1">{s.value}</h5>
            <span className="small">{s.change}</span>
          </div>
          <div
            className={`rounded-circle d-flex align-items-center justify-content-center ${s.bg}`}
            style={{
              width: 55,
              height: 55,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <i className={`bi ${s.icon} fs-4 text-white`} />
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

{/* ACTION CARDS */}
<div className="row g-4 mb-4">
  {PASSENGER_CONFIG.cards.map((c, i) => (
    <div className="col-md-4" key={i}>
      <div
        className="card border-0 rounded-4 shadow-lg h-100"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #0dcaf0)",
          color: "#fff",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onClick={() => navigate(c.path)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow =
            "0 16px 40px rgba(13,110,253,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 8px 24px rgba(0,0,0,0.15)";
        }}
      >
        <div className="card-body d-flex align-items-center justify-content-between p-4">
          <div>
            <h5 className="fw-bold mb-1">{c.title}</h5>
            <p className="small mb-0 opacity-75">
              View & manage all your bookings
            </p>
          </div>

          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 55,
              height: 55,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <i className="bi bi-arrow-right fs-4 text-white"></i>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


      
    </main>
  );
}
