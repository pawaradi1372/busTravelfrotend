// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function OperatorRevenue() {
//   const [revenueData, setRevenueData] = useState(null);
//   const [loading, setLoading] = useState(true);
//    const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRevenue = async () => {
//       try {
//         const res = await api.get("/revenue/my");
//         setRevenueData(res.data);
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to fetch revenue");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRevenue();
//   }, []);

//   if (loading) return <h3 className="text-center py-4">Loading revenue...</h3>;

//   if (!revenueData || !revenueData.buses)
//     return <h3 className="text-center py-4 text-danger">No revenue data found</h3>;

//   return (
//     <main className="container py-4">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <button
//         className="btn btn-secondary mb-3"
//         onClick={() => navigate(-1)}
//       >
//         ← Back
//       </button>

//       <h2 className="mb-4 text-center">Operator Revenue Dashboard</h2>

//       <div className="card shadow-sm p-3 mb-4">
//         <h4>Total Revenue: ₹{revenueData.totalOperatorRevenue}</h4>
//         <h4>Total Bookings: {revenueData.totalOperatorBookings}</h4>
//       </div>

//       <div className="card shadow-sm p-3">
//         <h5>Revenue By Bus</h5>

//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>Bus No</th>
             
//               <th>Total Revenue (₹)</th>
//               <th>Total Bookings</th>
//             </tr>
//           </thead>

//           <tbody>
//             {revenueData.buses.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center text-muted">
//                   No buses or no bookings
//                 </td>
//               </tr>
//             ) : (
//               revenueData.buses.map((bus) => (
//                 <tr key={bus.busId}>
//                   <td>{bus.busNumber}</td>
                 
//                   <td>₹{bus.totalBusRevenue}</td>
//                   <td>{bus.totalBusBookings}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OperatorRevenue() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await api.get("/revenue/my");
        setData(res.data);
      } catch (err) {
        toast.error("Failed to load revenue");
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  if (loading)
    return <div className="text-center py-5">Loading collections...</div>;

  if (!data)
    return <div className="text-center py-5 text-danger">No data found</div>;

  return (
    <main className="container py-4">
      <ToastContainer />

      {/* Back */}
      <button
        className="btn btn-light border mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* MAIN COLLECTION BLOCK */}
      <div className="border rounded-4 p-4 mb-4 bg-white shadow-sm">
        <p className="text-muted mb-1">Total Money Collected</p>
        <h1 className="fw-bold text-success mb-2">
          ₹ {data.totalOperatorRevenue}
        </h1>

        <div className="d-flex gap-4 text-muted small">
          <span>
            <strong>{data.totalOperatorBookings}</strong> bookings
          </span>
          <span>
            Avg / booking: ₹
            {data.totalOperatorBookings === 0
              ? 0
              : Math.round(
                  data.totalOperatorRevenue /
                    data.totalOperatorBookings
                )}
          </span>
        </div>
      </div>

      {/* BUS COLLECTION LIST */}
      <div className="border rounded-4 bg-white shadow-sm">
        <div className="p-3 border-bottom fw-semibold">
          Bus-wise Collection
        </div>

        {data.buses.length === 0 ? (
          <div className="p-4 text-center text-muted">
            No bus revenue found
          </div>
        ) : (
          data.buses.map((bus) => (
            <div
              key={bus.busId}
              className="d-flex justify-content-between align-items-center p-3 border-bottom"
            >
              <div>
                <div className="fw-semibold">{bus.busNumber}</div>
                <small className="text-muted">
                  {bus.totalBusBookings} bookings
                </small>
              </div>

              <div className="fw-bold text-success fs-6">
                ₹ {bus.totalBusRevenue}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
