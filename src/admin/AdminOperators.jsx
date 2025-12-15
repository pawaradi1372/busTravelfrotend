// // src/pages/AdminOperators.jsx
// import React, { useEffect, useState } from "react";
// import api from "../api/axiosInstance";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// export default function AdminOperators() {
//   const [operators, setOperators] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchOperators();
//   }, []);

// const fetchOperators = async () => {
//   try {
//     const res = await api.get("/revenue/"); // admin route
//     setOperators(res.data);
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Failed to fetch operators");
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this operator?")) return;
//     try {
//       setDeletingId(id);
//       const res = await api.delete(`auth/operator/${id}`);
//       toast.success(res.data.message);
//       setOperators((prev) => prev.filter((op) => op.operatorId !== id));
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete operator");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (loading) return <div className="text-center py-5">Loading operators...</div>;

//  return (
//   <main className="container py-4">
//     <ToastContainer position="top-right" autoClose={3000} />

//     <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
//       ← Back
//     </button>

//     <h2 className="mb-4 text-center">Operators & Revenue</h2>

//     {/* ===== Total Revenue Card ===== */}
//     <div className="row mb-4">
//       <div className="col-md-4 mx-auto">
//         <div className="card shadow-lg text-center p-3 border-success">
//           <h4 className="mb-2">Total Revenue</h4>

//           <h2 className="text-success fw-bold">
//             ₹
//             {operators.reduce((acc, op) => acc + (op.revenue || 0), 0)}
//           </h2>
//         </div>
//       </div>
//     </div>

//     {/* ===== Total Operators Display ===== */}
//     <div className="text-center mb-3">
//       <strong>Total Operators: {operators.length}</strong>
//     </div>

//     {operators.length === 0 ? (
//       <div className="alert alert-warning">No operators found</div>
//     ) : (
//       <div className="row g-4">
//         {operators.map((op) => (
//           <div key={op.operatorId} className="col-md-6 col-lg-4">
//             <div className="card shadow-sm h-100">
//               <div className="card-body d-flex flex-column">

//                 <h5 className="card-title">{op.operatorName}</h5>
//                 <p className="mb-1"><strong>Email:</strong> {op.email}</p>
//                 <p className="mb-1"><strong>Trips:</strong> {op.tripsCount}</p>
//                 <p className="mb-1"><strong>Bookings:</strong> {op.bookingsCount}</p>
//                 <p className="mb-1"><strong>Revenue:</strong> ₹{op.revenue}</p>

//                 <button
//                   className="btn btn-danger mt-auto"
//                   onClick={() => handleDelete(op.operatorId)}
//                   disabled={deletingId === op.operatorId}
//                 >
//                   {deletingId === op.operatorId ? "Deleting..." : "Delete Operator"}
//                 </button>

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </main>
// );

// }

import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminOperators() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const res = await api.get("/revenue/");
      setOperators(res.data);
    } catch {
      toast.error("Failed to load operators");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this operator?")) return;
    try {
      setDeletingId(id);
      await api.delete(`/auth/operator/${id}`);
      toast.success("Operator removed");
      setOperators(prev => prev.filter(op => op.operatorId !== id));
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const totalRevenue = operators.reduce(
    (sum, op) => sum + (op.totalRevenue || 0),
    0
  );

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <main className="container-fluid px-4 py-4">
      <ToastContainer />

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Operator Management</h4>
          <p className="text-muted mb-0">
            Control operators, trips and revenue
          </p>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* ===== STATS ROW ===== */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-people-fill fs-1 text-primary me-3"></i>
              <div>
                <small className="text-muted">Total Operators</small>
                <h5 className="fw-bold mb-0">{operators.length}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-currency-rupee fs-1 text-success me-3"></i>
              <div>
                <small className="text-muted">Combined Revenue</small>
                <h5 className="fw-bold mb-0">₹{totalRevenue}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== OPERATOR GRID ===== */}
      <div className="row g-4">
        {operators.map(op => (
          <div key={op.operatorId} className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm h-100 operator-card">
              <div className="card-body">

                {/* Profile */}
                <div className="text-center mb-3">
                  <div className="bg-primary text-white rounded-circle mx-auto mb-2"
                    style={{ width: 56, height: 56, lineHeight: "56px" }}>
                    <i className="bi bi-person-fill fs-4"></i>
                  </div>
                  <h6 className="fw-bold mb-0">{op.operatorName}</h6>
                  <small className="text-muted">{op.email}</small>
                </div>

                {/* Stats */}
                <div className="d-flex justify-content-between text-center mb-3">
                  <div>
                    <span className="badge bg-info px-4 py-2">
                      Trips: {op.totalTrips}
                    </span>
                  </div>
                  
                  <div>
                    <span className="badge bg-success px-5 py-2">
                      ₹{op.totalRevenue}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <button
                  className="btn btn-outline-danger w-100"
                  disabled={deletingId === op.operatorId}
                  onClick={() => handleDelete(op.operatorId)}
                >
                  {deletingId === op.operatorId ? "Removing..." : "Remove Operator"}
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
