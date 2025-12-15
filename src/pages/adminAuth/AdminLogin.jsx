// // src/pages/Admin/AdminLogin.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axiosInstance";


// export default function AdminLogin({ setRole, setUser }) {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await api.post("/auth/login", {
//         ...formData,
//         role: "admin",     // ✅ SEND ROLE
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", "admin");
//       localStorage.setItem("user", JSON.stringify(res.data));

//       setRole("admin");
//       setUser(res.data);

//       navigate("/admin/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Invalid login");
//     }
//   };

//   return (
//     <div className="container py-5" style={{ maxWidth: "400px" }}>
//       <h3 className="text-center mb-4">Admin Login</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" className="form-control"
//             name="email" onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })} required />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input type="password" className="form-control"
//             name="password" onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })} required />
//         </div>

//         <button className="btn btn-success w-100">Login</button>
//            <p className="text-center mt-3">
//           Don’t have an account? <a href="/admin/register">Register</a>
//         </p>
//         <p>email: admin@gmail.com password: Admin@123</p>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

export default function AdminLogin({ setRole, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { ...formData, role: "admin" });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify(res.data));

      setRole("admin");
      setUser(res.data);

      navigate("/admin/dashboard");
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
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin Logo"
            style={{ width: "80px", marginBottom: "10px" }}
          />
          <h3 style={{ fontWeight: "700", color: "#106dcaff" }}>Admin Login</h3>
          <p style={{ color: "#555" }}>Manage your system securely</p>
        </div>

        {message && <div className="alert alert-danger">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
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
              name="password"
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
            <a href="/admin/register" style={{ color: "#106dcaff", fontWeight: "600" }}>
              Register
            </a>
          </p>

          <p className="text-center mt-2" style={{ color: "#555", fontSize: "14px" }}>
            demo: admin@gmail.com / Admin@123
          </p>
        </form>
      </div>
    </div>
  );
}
