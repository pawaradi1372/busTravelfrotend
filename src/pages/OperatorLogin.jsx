// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axiosInstance";

// export default function OperatorLogin({ setRole, setUser }) {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Same login route for all
//       const res = await api.post("/auth/login", {
//         ...formData,
//         role: "operator",     // ✅ SEND ROLE
//       });

//       if (res.data.role !== "operator") {
//         return alert("You are not an operator!");
//       }

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("user", JSON.stringify(res.data));

//       setRole(res.data.role);
//       setUser(res.data);

//       navigate("/operator/buses");
//     } catch (err) {
//       alert(err.response?.data?.message || "Invalid login");
//     }
//   };

//   return (
//     <div className="container py-5" style={{ maxWidth: "400px" }}>
//       <h3 className="text-center mb-4">Operator Login</h3>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             required
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             required
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//           />
//         </div>

//         <button className="btn btn-primary w-100">Login</button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function OperatorLogin({ setRole, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { ...formData, role: "operator" });

      if (res.data.role !== "operator") {
        return setMessage("You are not an operator!");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data));

      setRole(res.data.role);
      setUser(res.data);

      navigate("/operator/buses");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid login");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #106dcaff, #00c6ff)" }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ borderRadius: "20px", width: "380px", backgroundColor: "#ffffffdd" }}
      >
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1183/1183672.png"
            alt="Operator Logo"
            style={{ width: "80px", marginBottom: "10px" }}
          />
          <h3 style={{ fontWeight: "700", color: "#106dcaff" }}>Operator Login</h3>
          <p style={{ color: "#555" }}>Manage your buses and trips</p>
        </div>

        {message && <div className="alert alert-danger">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            <a href="/operator/register" style={{ color: "#106dcaff", fontWeight: "600" }}>
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
