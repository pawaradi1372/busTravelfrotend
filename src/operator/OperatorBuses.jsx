import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OperatorBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    busNumber: "",
    totalSeats: "",
    amenities: "",
    status: "active",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const operatorId = user?._id;

  const fetchBuses = async () => {
    try {
      const res = await api.get(`/buses?operator=${operatorId}`);
      setBuses(res.data);
    } catch {
      toast.error("Failed to fetch buses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (operatorId) fetchBuses();
  }, [operatorId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddBus = async (e) => {
    e.preventDefault();

    const totalSeats = parseInt(formData.totalSeats);
    if (!formData.busNumber || totalSeats <= 0) {
      toast.error("Bus number & seats required");
      return;
    }

    const seatLayout = Array.from({ length: totalSeats }, (_, i) => ({
      seatNumber: `S${i + 1}`,
      isAvailable: true,
    }));

    const payload = {
      ...formData,
      operator: operatorId,
      totalSeats,
      availableSeats: totalSeats,
      seatLayout,
      amenities: formData.amenities
        ? formData.amenities.split(",").map((a) => a.trim())
        : [],
    };

    try {
      await api.post("/buses", payload);
      toast.success("Bus added successfully");
      setShowForm(false);
      setFormData({ busNumber: "", totalSeats: "", amenities: "", status: "active" });
      fetchBuses();
    } catch {
      toast.error("Failed to add bus");
    }
  };

  if (loading)
    return <div className="text-center py-5">Loading buses...</div>;

  return (
    <main className="container-fluid px-4 py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">My Buses</h4>
          <p className="text-muted mb-0">Manage your registered buses</p>
        </div>

        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Bus"}
          </button>
        </div>
      </div>

      {/* Add Bus Card */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white fw-semibold">
            Add New Bus
          </div>

          <div className="card-body">
            <form onSubmit={handleAddBus}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Bus Number</label>
                  <input className="form-control" name="busNumber" onChange={handleChange} />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Total Seats</label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalSeats"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Amenities</label>
                  <input
                    className="form-control"
                    name="amenities"
                    placeholder="AC, WiFi, Charger"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Status</label>
                  <select className="form-select" name="status" onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <button className="btn btn-primary mt-3">Save Bus</button>
            </form>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-body table-responsive">

          {buses.length === 0 ? (
            <div className="alert alert-warning mb-0">No buses found</div>
          ) : (
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Bus No</th>
                  <th>Seats</th>
                  <th>Available</th>
                  <th>Status</th>
                  <th>Amenities</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {buses.map((bus, i) => (
                  <tr key={bus._id}>
                    <td>{i + 1}</td>
                    <td className="fw-semibold">{bus.busNumber}</td>
                    <td>{bus.totalSeats}</td>
                    <td>{bus.availableSeats}</td>
                    <td>
                      <span className={`badge ${bus.status === "active" ? "bg-success" : "bg-secondary"}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td className="text-muted small">{bus.amenities?.join(", ")}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                      <button className="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </main>
  );
}



// import React, { useState, useEffect } from "react";
// import api from "../api/axiosInstance";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export default function OperatorBuses() {
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);

//   const [formData, setFormData] = useState({
//     busNumber: "",
//     totalSeats: 0,
//     amenities: "",
//     status: "active",
//   });

//   const navigate = useNavigate();

//   // Logged-in operator data
//   const user = JSON.parse(localStorage.getItem("user"));
//   const operatorId = user?._id;       // <-- IMPORTANT: REAL OPERATOR ID

//   // Fetch operator buses
//   const fetchBuses = async () => {
//     try {
//       const res = await api.get(`/buses?operator=${operatorId}`);
//       setBuses(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch buses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (operatorId) fetchBuses();
//   }, [operatorId]);

//   // onChange handler
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add new bus handler
//   const handleAddBus = async (e) => {
//     e.preventDefault();

//     try {
//       const totalSeats = parseInt(formData.totalSeats);

//       if (!formData.busNumber || totalSeats <= 0) {
//         toast.error("Bus number and total seats are required");
//         return;
//       }

//       // Auto generate seats S1, S2...
//       const seatLayout = Array.from({ length: totalSeats }, (_, i) => ({
//         seatNumber: `S${i + 1}`,
//         isAvailable: true,
//       }));

//       const payload = {
//         ...formData,
//         operator: operatorId, // <-- FIXED
//         availableSeats: totalSeats,
//         totalSeats,
//         seatLayout,
//         amenities: formData.amenities
//           ? formData.amenities.split(",").map((a) => a.trim())
//           : [],
//       };

//       await api.post("/buses", payload, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       toast.success("Bus added successfully!");

//       // Reset
//       setShowForm(false);
//       setFormData({
//         busNumber: "",
//         totalSeats: 0,
//         amenities: "",
//         status: "active",
//       });

//       fetchBuses();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Failed to add bus");
//     }
//   };

//   if (loading)
//     return <div className="text-center py-5">Loading buses...</div>;

//   return (
//     <main className="container py-4">

//       <button
//         className="btn btn-secondary mb-3"
//         onClick={() => navigate(-1)}
//       >
//         ← Back
//       </button>

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3>My Buses</h3>
//         <button
//           className="btn btn-success"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Cancel" : "Add Bus"}
//         </button>
//       </div>

//       {/* Add Bus Form */}
//       {showForm && (
//         <form className="mb-4 border p-3 rounded" onSubmit={handleAddBus}>
//           <div className="row g-3">
//             <div className="col-md-3">
//               <label className="form-label">Bus Number</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="busNumber"
//                 value={formData.busNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Total Seats</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="totalSeats"
//                 value={formData.totalSeats}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Amenities (comma separated)</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="amenities"
//                 value={formData.amenities}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Status</label>
//               <select
//                 className="form-select"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>
//           </div>

//           <button type="submit" className="btn btn-primary mt-3">
//             Add Bus
//           </button>
//         </form>
//       )}

//       {/* Bus Table */}
//       {buses.length === 0 ? (
//         <div className="alert alert-warning">
//           No buses found for your account.
//         </div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>#</th>
//                 <th>Bus Number</th>
//                 <th>Total Seats</th>
//                 <th>Available Seats</th>
//                 <th>Status</th>
//                 <th>Amenities</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {buses.map((bus, idx) => (
//                 <tr key={bus._id}>
//                   <td>{idx + 1}</td>
//                   <td>{bus.busNumber}</td>
//                   <td>{bus.totalSeats}</td>
//                   <td>{bus.availableSeats}</td>

//                   <td>
//                     <span
//                       className={`badge ${
//                         bus.status === "active"
//                           ? "bg-success"
//                           : "bg-secondary"
//                       }`}
//                     >
//                       {bus.status}
//                     </span>
//                   </td>

//                   <td>{bus.amenities?.join(", ")}</td>

//                   <td>
//                     <button className="btn btn-sm btn-primary me-2">
//                       Edit
//                     </button>
//                     <button className="btn btn-sm btn-danger">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       )}
//     </main>
//   );
// }
