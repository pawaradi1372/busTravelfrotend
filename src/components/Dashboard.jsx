import React from "react";
import AdminDashboard from "../dashbord/AdminDashboard";
import OperatorDashboard from "../dashbord/OperatorDashboard";
import PassengerDashboard from "../dashbord/PassengerDashboard";

export default function Dashboard({ role }) {
  if (role === "admin") return <AdminDashboard />;
  if (role === "operator") return <OperatorDashboard />;
  if (role === "passenger") return <PassengerDashboard />;

  return null;
}


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const DASHBOARD_CONFIG = {
//   admin: {
//     title: "Welcome to Admin Dashboard",
//     subtitle: "Here's what's happening with your bus system today",
//     stats: [
//       { label: "Total Operators", value: "24", change: "+12% this month", icon: "bi-people", bg: "bg-primary" },
//       { label: "Active Routes", value: "156", change: "+8% this month", icon: "bi-map", bg: "bg-info" },
//       { label: "Today's Revenue", value: "₹12,450", change: "+15% vs yesterday", icon: "bi-cash", bg: "bg-success" },
//       { label: "Active Bookings", value: "892", change: "-3% vs yesterday", icon: "bi-ticket", bg: "bg-warning" },
//     ],
//     cards: [
//       { title: "Manage Operators", path: "/admin/operators" },
//       { title: "Manage Routes", path: "/admin/routes" },
//       { title: "View Reports", path: "/admin/reports" },
//       { title: "Revenue", path: "/admin/revenue" },
//     ],
//   },

//   operator: {
//     title: "Welcome to Operator Dashboard",
//     subtitle: "Manage your buses, trips and earnings",
//     stats: [
//       { label: "My Buses", value: "12", change: "Active", icon: "bi-bus-front", bg: "bg-primary" },
//       { label: "My Trips", value: "38", change: "Scheduled", icon: "bi-calendar-event", bg: "bg-info" },
//       { label: "Today's Revenue", value: "₹3,250", change: "+10% today", icon: "bi-cash", bg: "bg-success" },
//       { label: "Active Bookings", value: "124", change: "Running", icon: "bi-ticket", bg: "bg-warning" },
//     ],
//     cards: [
//       { title: "My Buses", path: "/operator/buses" },
//       { title: "My Trips", path: "/operator/trips" },
//       { title: "My Revenue", path: "/operator/revenue" },
//     ],
//   },

//   passenger: {
//     title: "Welcome to Passenger Dashboard",
//     subtitle: "Book buses and manage your trips",
//     stats: [
//       { label: "My Bookings", value: "6", change: "Total", icon: "bi-ticket", bg: "bg-primary" },
//       { label: "Upcoming Trips", value: "2", change: "Scheduled", icon: "bi-calendar", bg: "bg-info" },
//       { label: "Amount Spent", value: "₹4,800", change: "All time", icon: "bi-cash", bg: "bg-success" },
//       { label: "Completed Trips", value: "4", change: "History", icon: "bi-check-circle", bg: "bg-warning" },
//     ],
//     cards: [
//       { title: "Search Buses", path: "/passenger/search" },
//       { title: "My Bookings", path: "/passenger/bookings" },
//       { title: "Feedback", path: "/passenger/feedback" },
//     ],
//   },
// };

// export default function Dashboard({ role }) {
//   const navigate = useNavigate();
//   const config = DASHBOARD_CONFIG[role];

//   return (
//     <main className="container-fluid px-4 py-3">

//       {/* Header */}
//       <div className="mb-4">
//         <h4 className="fw-bold">{config.title}</h4>
//         <p className="text-muted mb-0">{config.subtitle}</p>
//       </div>

//       {/* Passenger Search Bar */}
//       {role === "passenger" && (
//         <div className="card border-0 shadow-sm mb-4">
//           <div className="card-body">
//             <div className="row g-3 align-items-end">

//               <div className="col-md-3">
//                 <label className="form-label small text-muted">From</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="City / Location"
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label className="form-label small text-muted">To</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Destination"
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label className="form-label small text-muted">Journey Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                 />
//               </div>

//               <div className="col-md-3 d-grid">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => navigate("/passenger/search")}
//                 >
//                   <i className="bi bi-search me-2"></i>
//                   Search Buses
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>
//       )}

//       {/* Stats */}
//       <div className="row g-4 mb-4">
//         {config.stats.map((s, i) => (
//           <div className="col-xl-3 col-md-6" key={i}>
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body d-flex align-items-center justify-content-between">
//                 <div>
//                   <p className="text-muted mb-1 small">{s.label}</p>
//                   <h5 className="fw-bold mb-1">{s.value}</h5>
//                   <span className="text-success small">{s.change}</span>
//                 </div>

//                 <div
//                   className={`d-flex align-items-center justify-content-center rounded-circle text-white ${s.bg}`}
//                   style={{ width: 48, height: 48 }}
//                 >
//                   <i className={`bi ${s.icon} fs-4`}></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Action Cards */}
//       <div className="row g-4">
//         {config.cards.map((c, i) => (
//           <div className="col-xl-3 col-md-6" key={i}>
//             <div
//               className="card h-100 border-0 shadow-sm text-center dashboard-action"
//               style={{ cursor: "pointer" }}
//               onClick={() => navigate(c.path)}
//             >
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



// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const DASHBOARD_CONFIG = {
// //   admin: {
// //     title: "Welcome to Admin Dashboard",
// //     subtitle: "Here's what's happening with your bus system today",
// //     stats: [
// //       { label: "Total Operators", value: "24", change: "+12% this month", icon: "bi-people", bg: "bg-primary" },
// //       { label: "Active Routes", value: "156", change: "+8% this month", icon: "bi-map", bg: "bg-info" },
// //       { label: "Today's Revenue", value: "₹12,450", change: "+15% vs yesterday", icon: "bi-cash", bg: "bg-success" },
// //       { label: "Active Bookings", value: "892", change: "-3% vs yesterday", icon: "bi-ticket", bg: "bg-warning" },
// //     ],
// //     cards: [
// //       { title: "Manage Operators", path: "/admin/operators" },
// //       { title: "Manage Routes", path: "/admin/routes" },
// //       { title: "View Reports", path: "/admin/reports" },
// //       { title: "Revenue", path: "/admin/revenue" },
// //     ],
// //   },

// //   operator: {
// //     title: "Welcome to Operator Dashboard",
// //     subtitle: "Manage your buses, trips and earnings",
// //     stats: [
// //       { label: "My Buses", value: "12", change: "Active", icon: "bi-bus-front", bg: "bg-primary" },
// //       { label: "My Trips", value: "38", change: "Scheduled", icon: "bi-calendar-event", bg: "bg-info" },
// //       { label: "Today's Revenue", value: "₹3,250", change: "+10% today", icon: "bi-cash", bg: "bg-success" },
// //       { label: "Active Bookings", value: "124", change: "Running", icon: "bi-ticket", bg: "bg-warning" },
// //     ],
// //     cards: [
// //       { title: "My Buses", path: "/operator/buses" },
// //       { title: "My Trips", path: "/operator/trips" },
// //       { title: "My Revenue", path: "/operator/revenue" },
// //     ],
// //   },

// //   passenger: {
// //     title: "Welcome to Passenger Dashboard",
// //     subtitle: "Book buses and manage your trips",
// //     stats: [
// //       { label: "My Bookings", value: "6", change: "Total", icon: "bi-ticket", bg: "bg-primary" },
// //       { label: "Upcoming Trips", value: "2", change: "Scheduled", icon: "bi-calendar", bg: "bg-info" },
// //       { label: "Amount Spent", value: "₹4,800", change: "All time", icon: "bi-cash", bg: "bg-success" },
// //       { label: "Completed Trips", value: "4", change: "History", icon: "bi-check-circle", bg: "bg-warning" },
// //     ],
// //     cards: [
// //       { title: "Search Buses", path: "/passenger/search" },
// //       { title: "My Bookings", path: "/passenger/bookings" },
// //       { title: "Feedback", path: "/passenger/feedback" },
// //     ],
// //   },
// // };

// // export default function Dashboard({ role }) {
// //   const navigate = useNavigate();
// //   const config = DASHBOARD_CONFIG[role];

// //   return (
// //     <main className="container-fluid px-4 py-3">
// //       {/* Header */}
// //       <div className="mb-4">
// //         <h4 className="fw-bold">{config.title}</h4>
// //         <p className="text-muted mb-0">{config.subtitle}</p>
// //       </div>

// //       {/* Stats */}
// //       <div className="row g-4 mb-4">
// //         {config.stats.map((s, i) => (
// //           <div className="col-xl-3 col-md-6" key={i}>
// //             <div className="card border-0 shadow-sm h-100">
// //               <div className="card-body d-flex align-items-center justify-content-between">
// //                 <div>
// //                   <p className="text-muted mb-1 small">{s.label}</p>
// //                   <h5 className="fw-bold mb-1">{s.value}</h5>
// //                   <span className="text-success small">{s.change}</span>
// //                 </div>

// //                 <div
// //                   className={`d-flex align-items-center justify-content-center rounded-circle text-white ${s.bg}`}
// //                   style={{ width: 48, height: 48 }}
// //                 >
// //                   <i className={`bi ${s.icon} fs-4`}></i>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Action Cards */}
// //       <div className="row g-4">
// //         {config.cards.map((c, i) => (
// //           <div className="col-xl-3 col-md-6" key={i}>
// //             <div
// //               className="card h-100 border-0 shadow-sm text-center dashboard-action"
// //               onClick={() => navigate(c.path)}
// //             >
// //               <div className="card-body d-flex align-items-center justify-content-center">
// //                 <h6 className="fw-semibold mb-0">{c.title}</h6>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </main>
// //   );
// // }




// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const dashboardCards = {
// //   admin: [
// //     { title: "Manage operater", desc: "Add, edit, delete operater", icon: "bi-bus", border: "border-primary", path: "/admin/create-operator" },
// //     { title: "Manage Routes", desc: "Create bus routes", icon: "bi-map", border: "border-primary", path: "/admin/routes" },
// //     { title: "Manage Users", desc: "operators, passengers", icon: "bi-people", border: "border-primary", path: "/admin/operators" },
// //     { title: "View Reports", desc: "Full system reports", icon: "bi-graph-up", border: "border-primary", path: "/admin/reports" },
// //   ],
// //   operator: [
// //     { title: "My Buses", desc: "Manage your own buses only", icon: "bi-bus", border: "border-success", path: "/operator/buses" },
// //     { title: "My Trips", desc: "Create and manage your trips", icon: "bi-calendar-event", border: "border-success", path: "/operator/trips" },
// //     { title: "My Revenue", desc: "View your earnings", icon: "bi-bar-chart", border: "border-success", path: "/operator/revenue" },
// //   ],
// //   passenger: [
// //     { title: "Search Buses", desc: "Find available buses", icon: "bi-search", border: "border-warning", path: "/passenger/search" },
// //     { title: "My Bookings", desc: "View your bookings", icon: "bi-ticket-detailed", border: "border-warning", path: "/passenger/bookings" },
// //     { title: "Rate & Feedback", desc: "Rate your journey", icon: "bi-star", border: "border-warning", path: "/passenger/feedback" },
// //   ],
// // };

// // const roleInfo = {
// //   admin: { name: "Admin", desc: "You have full access to manage the entire bus booking system." },
// //   operator: { name: "Operator", desc: "You can manage your own buses and trips only." },
// //   passenger: { name: "Passenger", desc: "You can search buses, make bookings, and give feedback." },
// // };

// // export default function Dashboard({ role }) {
// //   const navigate = useNavigate();

// //   const handleCardClick = (path) => {
// //     if (path) {
// //       navigate(path);
// //     } else {
// //       alert("You do not have permission to access this section.");
// //     }
// //   };

// //   return (
// //     <main className="container py-4">
// //       <div className={`alert mb-4 alert-${role === "admin" ? "primary" : role === "operator" ? "success" : "warning"}`}>
// //         <h6 className="mb-1">Current Role: {roleInfo[role].name}</h6>
// //         <p className="mb-0 small">{roleInfo[role].desc}</p>
// //       </div>

// //       <div className="row g-3">
// //         {dashboardCards[role].map((card, idx) => (
// //           <div className="col-md-3" key={idx}>
// //             <div
// //               className={`card h-100 border ${card.border} cursor-pointer`}
// //               style={{ cursor: "pointer" }}
// //               onClick={() => handleCardClick(card.path)}
// //             >
// //               <div className="card-body text-center">
// //                 <i
// //                   className={`bi ${card.icon} text-${role === "admin" ? "primary" : role === "operator" ? "success" : "warning"} fs-2`}
// //                 ></i>
// //                 <h6 className="mt-2">{card.title}</h6>
// //                 <small className="text-muted">{card.desc}</small>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </main>
// //   );
// // }
