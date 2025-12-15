
import React, { useState } from "react";

export default function Header({ role, setRole }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const roles = [
    { key: "admin", label: "Admin", icon: "bi-shield-check" },
    { key: "operator", label: "Operator", icon: "bi-person-gear" },
    { key: "passenger", label: "Passenger", icon: "bi-person-circle" },
  ];

  // Define which roles are allowed for the current user
  const allowedRoles = {
    admin: ["admin"],
    operator: ["operator"],
    passenger: ["passenger"],
  };

  const handleRoleClick = (selectedRole) => {
    if (allowedRoles[user.role].includes(selectedRole)) {
      setRole(selectedRole);
    } else {
      alert("You do not have permission to access this role!");
    }
  };

  return (
    <>
      <header className="bg-primary text-white py-4 shadow-sm">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <i className="bi bi-bus-front-fill fs-1 me-3"></i>
            <div>
              <h1 className="h3 mb-0">BusGo</h1>
              <small>Welcome to Bus Booking</small>
            </div>
          </div>

          {/* Role buttons */}
          <div className="btn-group mb-3 mb-md-0" role="group">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => handleRoleClick(r.key)}
                className={`btn btn-lg ${role === r.key ? "btn-light" : "btn-outline-light"}`}
              >
                <i className={`bi ${r.icon} me-2`}></i>
                {r.label}
              </button>
            ))}
          </div>

          {/* Profile & Logout */}
          <div className="d-flex gap-2 mt-3 mt-md-0">
            {user && (
              <>
                <button className="btn btn-light btn-sm" onClick={() => setShowProfile(true)}>
                  <i className="bi bi-person-circle me-2"></i>Profile
                </button>
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfile && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header">
                <h5 className="modal-title">Profile Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowProfile(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {user?.fullName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowProfile(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
