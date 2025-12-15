// // src/pages/operator/OperatorDashboard.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const OPERATOR_CONFIG = {
//   title: "Welcome to Operator Dashboard",
//   subtitle: "Manage your buses, trips and earnings",
//   stats: [
//     { label: "My Buses", value: "12", change: "Active", icon: "bi-bus-front", bg: "bg-primary" },
//     { label: "My Trips", value: "38", change: "Scheduled", icon: "bi-calendar-event", bg: "bg-info" },
//     { label: "Today's Revenue", value: "₹3,250", change: "+10% today", icon: "bi-cash", bg: "bg-success" },
//     { label: "Active Bookings", value: "124", change: "Running", icon: "bi-ticket", bg: "bg-warning" },
//   ],
//   cards: [
//     { title: "My Buses", path: "/operator/buses" },
//     { title: "My Trips", path: "/operator/trips" },
   
//     { title: "Revenue", path: "/operator/revenue" },
   
//   ],
// };

// export default function OperatorDashboard() {
//   const navigate = useNavigate();

//   return (
//     <main className="container-fluid px-4 py-3">

//       {/* Header */}
//       <div className="mb-4">
//         <h4 className="fw-bold">{OPERATOR_CONFIG.title}</h4>
//         <p className="text-muted mb-0">{OPERATOR_CONFIG.subtitle}</p>
//       </div>

//       {/* Stats */}
//       <div className="row g-4 mb-4">
//         {OPERATOR_CONFIG.stats.map((s, i) => (
//           <div className="col-xl-3 col-md-6" key={i}>
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body d-flex align-items-center justify-content-between">
//                 <div>
//                   <p className="text-muted mb-1 small">{s.label}</p>
//                   <h5 className="fw-bold mb-1">{s.value}</h5>
//                   <span className="text-muted small">{s.change}</span>
//                 </div>
//                 <div
//                   className={`rounded-circle d-flex align-items-center justify-content-center text-white ${s.bg}`}
//                   style={{ width: 48, height: 48 }}
//                 >
//                   <i className={`bi ${s.icon} fs-4`} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Action Cards */}
//       <div className="row g-4">
//         {OPERATOR_CONFIG.cards.map((c, i) => (
//           <div className="col-xl-4 col-md-6" key={i}>
//             <div
//               className="card border-0 shadow-sm text-center h-100 dashboard-action"
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


import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css"; 

const OPERATOR_CONFIG = {
  title: "Welcome to Operator Dashboard",
  subtitle: "Manage your buses, trips and earnings",
  stats: [
    { label: "My Buses", value: "12", change: "Active", icon: "bi-bus-front", bg: "bg-primary" },
    { label: "My Trips", value: "38", change: "Scheduled", icon: "bi-calendar-event", bg: "bg-info" },
    { label: "Today's Revenue", value: "₹3,250", change: "+10% today", icon: "bi-cash", bg: "bg-success" },
    { label: "Active Bookings", value: "124", change: "Running", icon: "bi-ticket", bg: "bg-warning" },
  ],
  actions: [
    {
      title: "My Buses",
      icon: "bi-bus-front",
      bg: "bg-primary",
      path: "/operator/buses",
    },
    {
      title: "My Trips",
      icon: "bi-calendar-event",
      bg: "bg-info",
      path: "/operator/trips",
    },
    {
      title: "Revenue",
      icon: "bi-cash-coin",
      bg: "bg-success",
      path: "/operator/revenue",
    },
  ],
};

export default function OperatorDashboard() {
  const navigate = useNavigate();

  return (
    <main className="container-fluid px-4 py-4">

      {/* ===== HEADER ===== */}
      <div className="mb-4">
        <h4 className="fw-bold">{OPERATOR_CONFIG.title}</h4>
        <p className="text-muted mb-0">{OPERATOR_CONFIG.subtitle}</p>
      </div>

      {/* ===== STATS ===== */}
      <div className="row g-4 mb-4">
        {OPERATOR_CONFIG.stats.map((s, i) => (
          <div className="col-xl-3 col-md-6" key={i}>
            <div className="card border-1 shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">{s.label}</p>
                  <h5 className="fw-bold mb-1">{s.value}</h5>
                  <span className="small text-muted">{s.change}</span>
                </div>

                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center text-white ${s.bg}`}
                  style={{ width: 52, height: 52 }}
                >
                  <i className={`bi ${s.icon} fs-4`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== ACTION CARDS (ADMIN STYLE) ===== */}
      <div className="row g-4">
        {OPERATOR_CONFIG.actions.map((a, i) => (
          <div className="col-xl-4 col-md-6" key={i}>
            <div
              className="card border-1 shadow-sm h-100 dashboard-action"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(a.path)}
            >
              <div className="card-body text-center">

                <div
                  className={`mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center text-white ${a.bg}`}
                  style={{ width: 70, height: 70 }}
                >
                  <i className={`bi ${a.icon} fs-2`} />
                </div>

                <h6 className="fw-semibold mb-0">{a.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
