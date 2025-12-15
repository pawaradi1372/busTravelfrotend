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
//     role: "passenger", // fixed
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/register", formData);
//       setMessage("Passenger registered successfully!");
//       setTimeout(() => navigate("/passenger/login"), 2000);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="container py-5" style={{ maxWidth: "500px" }}>
//       <h3 className="mb-4 text-center">Passenger Register</h3>

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

//         <p className="text-center mt-3">
//           Already have an account? <a href="/passenger/login">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// }
// src/pages/Passenger/PassengerRegister.jsx
import React, { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function PassengerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "passenger",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      setMessage("Passenger registered successfully!");
      setTimeout(() => navigate("/passenger/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
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
          width: "400px",
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
            Passenger Register
          </h3>
          <p style={{ color: "#555" }}>Create your account to book journeys</p>
        </div>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

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
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
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
            Register
          </button>

          <p className="text-center mt-3" style={{ color: "#555" }}>
            Already have an account?{" "}
            <a
              href="/passenger/login"
              style={{ color: "#106dcaff", fontWeight: "600" }}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
