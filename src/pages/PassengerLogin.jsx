// // src/pages/Passenger/PassengerLogin.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axiosInstance"

// export default function PassengerLogin({ setRole, setUser }) {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//     const res = await api.post("/auth/login", {
//         ...formData,
//         role: "passenger",     // ✅ SEND ROLE
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", "passenger");
//       localStorage.setItem("user", JSON.stringify(res.data));

//       setRole("passenger");
//       setUser(res.data);

//       navigate("/passenger/dashboard");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="container py-5" style={{ maxWidth: "400px" }}>
//       <h3 className="mb-4 text-center">Passenger Login</h3>

//       {message && <div className="alert alert-danger">{message}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" name="email" className="form-control"
//             value={formData.email} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input type="password" name="password" className="form-control"
//             value={formData.password} onChange={handleChange} required />
//         </div>

//         <button className="btn btn-success w-100">Login</button>

//         <p className="text-center mt-3">
//           Don’t have an account? <a href="/register">Register</a>
//         </p>
//       </form>
//     </div>
//   );
// }
// src/pages/Passenger/PassengerLogin.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function PassengerLogin({ setRole, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        ...formData,
        role: "passenger",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "passenger");
      localStorage.setItem("user", JSON.stringify(res.data));

      setRole("passenger");
      setUser(res.data);

      navigate("/passenger/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #106dcaff, #00c6ff)",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          borderRadius: "20px",
          width: "380px",
          backgroundColor: "#ffffffdd",
        }}
      >
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/61/61249.png"
            alt="Bus Logo"
            style={{ width: "80px", marginBottom: "10px" }}
          />
          <h3 style={{ fontWeight: "700", color: "#106dcaff" }}>
            Passenger Login
          </h3>
          <p style={{ color: "#555" }}>Book your next journey easily</p>
        </div>

        {message && <div className="alert alert-danger">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <button
            className="btn w-100"
            style={{
              backgroundColor: "#106dcaff",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "10px",
            }}
          >
            Login
          </button>

          <p className="text-center mt-3" style={{ color: "#555" }}>
            Don’t have an account?{" "}
            <a href="/register" style={{ color: "#106dcaff", fontWeight: "600" }}>
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
