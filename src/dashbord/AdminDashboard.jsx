// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css"; // Import custom CSS for Admin Dashboard

const ADMIN_CONFIG = {
  title: "Welcome to Admin Dashboard",
  subtitle: "System overview & complete bus management",
  stats: [
    { label: "Total Operators", value: "24", change: "+12% this month", icon: "bi-people", bg: "bg-primary" },
    { label: "Active Routes", value: "156", change: "+8% this month", icon: "bi-map", bg: "bg-info" },
    { label: "Today's Revenue", value: "₹12,450", change: "+15% vs yesterday", icon: "bi-cash", bg: "bg-success" },
    { label: "Active Bookings", value: "892", change: "-3% vs yesterday", icon: "bi-ticket", bg: "bg-warning" },
  ],
  cards: [
    {
      title: "Manage Operators",
      path: "/admin/create-operator",
      icon: "bi-people-fill",
      color: "primary",
    },
    {
      title: "Manage Routes",
      path: "/admin/routes",
      icon: "bi-geo-alt-fill",
      color: "info",
    },
    {
      title: "Revenue",
      path: "/admin/revenue",
      icon: "bi-currency-rupee",
      color: "success",
    },
  ],
};


export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <main className="container-fluid px-4 py-3">

      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold">{ADMIN_CONFIG.title}</h4>
        <p className="text-muted mb-0">{ADMIN_CONFIG.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-4">
        {ADMIN_CONFIG.stats.map((s, i) => (
          <div className="col-xl-3 col-md-6" key={i}>
            <div className="card border-1 shadow-sm h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 small">{s.label}</p>
                  <h5 className="fw-bold mb-1">{s.value}</h5>
                  <span className="text-success small">{s.change}</span>
                </div>
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center text-white ${s.bg}`}
                  style={{ width: 48, height: 48 }}
                >
                  <i className={`bi ${s.icon} fs-4`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    {/* Action Cards */}
<div className="row g-4 mt-1 ">
  {ADMIN_CONFIG.cards.map((c, i) => (
    <div className="col-xl-4 col-md-6" key={i}>
      <div
        className="card border-1 shadow-sm h-100 admin-action-card"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(c.path)}
      >
        <div className="card-body text-center py-5">

          <div
            className={`mx-auto mb-3 rounded-circle bg-${c.color} bg-opacity-10 d-flex align-items-center justify-content-center`}
            style={{ width: 80, height: 80 }}
          >
            <i
              className={`bi ${c.icon} text-${c.color}`}
              style={{ fontSize: "36px" }}
            ></i>
          </div>

          <h6 className="fw-bold mb-1">{c.title}</h6>
          <p className="text-muted small mb-0">
            Click to manage
          </p>

        </div>
      </div>
    </div>
  ))}
</div>
    </main>
  );
}
