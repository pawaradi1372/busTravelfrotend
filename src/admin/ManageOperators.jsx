import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function OperatorRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "operator",
  });

  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ---------------- REGISTER OPERATOR ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", formData);
      setMessage("Operator registered successfully");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "operator",
      });
      fetchOperators();
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FETCH OPERATORS ---------------- */
  const fetchOperators = async () => {
    try {
      const { data } = await api.get("/revenue/");
      setOperators(data);
    
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  return (
    <div className="container-fluid px-4 py-4">

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Operator Management</h4>
          <p className="text-muted mb-0">Register and manage bus operators</p>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* REGISTER CARD */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-person-plus me-2"></i>
            Register New Operator
          </h6>

          {message && <div className="alert alert-info py-2">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="mt-3 text-end">
              <button className="btn btn-primary px-4" disabled={loading}>
                {loading ? "Registering..." : "Register Operator"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* OPERATOR LIST */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-people me-2"></i>
            Registered Operators
          </h6>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {operators.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No operators found
                    </td>
                  </tr>
                ) : (
                  operators.map((op, index) => (
                    <tr key={op._id}>
                      <td>{index + 1}</td>
                       <td className="fw-semibold">{op.operatorName}</td>
                      <td>{op.email}</td>
                      <td>{op.phone || "-"}</td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  );
}


// // src/pages/Passenger/PassengerRegister.jsx
// import React, { useState } from "react";
// import api from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function PassengerRegister() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "operator", // fixed
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/register", formData);
//       setMessage("operater registered successfully!");
//       setTimeout(() => navigate(-1), 2000);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="container py-5" style={{ maxWidth: "500px" }}>
//       <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>← Back</button>
//       <h3 className="mb-4 text-center">Operater Register</h3>

//       {message && <div className="alert alert-info">{message}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Full Name</label>
//           <input type="text" name="fullName" className="form-control"
//             value={formData.fullName} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" name="email" className="form-control"
//             value={formData.email} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Phone</label>
//           <input type="text" name="phone" className="form-control"
//             value={formData.phone} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input type="password" name="password" className="form-control"
//             value={formData.password} onChange={handleChange} required />
//         </div>

//         <button className="btn btn-primary w-100">Register</button>

      
//       </form>
//     </div>
//   );
// }



