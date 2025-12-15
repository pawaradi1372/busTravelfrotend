// import React, { useEffect, useState } from "react";
// import api from "../api/axiosInstance";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export default function OperatorTrips() {
//   const [trips, setTrips] = useState([]);
//   const [buses, setBuses] = useState([]);
//   const [routes, setRoutes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     bus: "",
//     route: "",
//     departureTime: "",
//     arrivalTime: "",
//     pricePerSeat: "",
//     status: "scheduled",
//   });
//   const [editId, setEditId] = useState(null);

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const operatorId = user._id || null;

//   // Fetch data when operatorId is available
//   useEffect(() => {
//     if (!operatorId) return;
//     fetchTrips();
//     fetchBuses();
//     fetchRoutes();
//   }, [operatorId]);

//   const fetchTrips = async () => {
//     try {
//       const res = await api.get(`/trips?operator=${operatorId}`);
//       setTrips(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch trips");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBuses = async () => {
//     try {
//       const res = await api.get(`/buses?operator=${operatorId}`);
//       setBuses(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch buses");
//     }
//   };

//   const fetchRoutes = async () => {
//     try {
//       const res = await api.get("/routes");
//       setRoutes(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch routes");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         pricePerSeat: Number(formData.pricePerSeat),
//       };

//       if (editId) {
//         await api.put(`/trips/${editId}`, payload);
//         toast.success("Trip updated successfully");
//       } else {
//         await api.post("/trips", payload);
//         toast.success("Trip added successfully");
//       }

//       setFormData({
//         bus: "",
//         route: "",
//         departureTime: "",
//         arrivalTime: "",
//         pricePerSeat: "",
//         status: "scheduled",
//       });
//       setEditId(null);
//       fetchTrips();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Error saving trip");
//     }
//   };

//   const handleEdit = (trip) => {
//     setEditId(trip._id);
//     setFormData({
//       bus: trip.bus?._id || "",
//       route: trip.route?._id || "",
//       departureTime: trip.departureTime?.slice(0, 16) || "",
//       arrivalTime: trip.arrivalTime?.slice(0, 16) || "",
//       pricePerSeat: trip.pricePerSeat || "",
//       status: trip.status || "scheduled",
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to cancel this trip?")) return;
//     try {
//       await api.delete(`/trips/${id}`);
//       toast.success("Trip cancelled successfully");
//       fetchTrips();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to cancel trip");
//     }
//   };

//   if (!operatorId) return <div className="text-center py-5">Loading...</div>;
//   if (loading) return <div className="text-center py-5">Loading trips...</div>;

//   return (
//     <main className="container py-4">
//       <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
//         &larr; Back
//       </button>

//       <h3 className="mb-4">My Trips</h3>

//       {/* Add/Edit Form */}
//       <div className="card mb-4">
//         <div className="card-body">
//           <h5>{editId ? "Edit Trip" : "Add Trip"}</h5>
//           <form onSubmit={handleSubmit}>
//             <div className="row g-3">
//               <div className="col-md-3">
//                 <select
//                   className="form-select"
//                   name="bus"
//                   value={formData.bus}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Bus</option>
//                   {buses.map((bus) => (
//                     <option key={bus._id} value={bus._id}>
//                       {bus.busNumber}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-3">
//                 <select
//                   className="form-select"
//                   name="route"
//                   value={formData.route}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Route</option>
//                   {routes.map((route) => (
//                     <option key={route._id} value={route._id}>
//                       {route.startPoint} → {route.endPoint}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-3">
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="departureTime"
//                   value={formData.departureTime}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-3">
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="arrivalTime"
//                   value={formData.arrivalTime}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-2">
//                 <input
//                   type="number"
//                   className="form-control"
//                   name="pricePerSeat"
//                   placeholder="Price per Seat"
//                   value={formData.pricePerSeat}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-2">
//                 <select
//                   className="form-select"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                 >
//                   <option value="scheduled">Scheduled</option>
//                   <option value="cancelled">Cancelled</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>

//               <div className="col-md-2">
//                 <button type="submit" className="btn btn-success w-100">
//                   {editId ? "Update" : "Add"} Trip
//                 </button>
//               </div>

//               {editId && (
//                 <div className="col-md-2">
//                   <button
//                     type="button"
//                     className="btn btn-secondary w-100"
//                     onClick={() => {
//                       setEditId(null);
//                       setFormData({
//                         bus: "",
//                         route: "",
//                         departureTime: "",
//                         arrivalTime: "",
//                         pricePerSeat: "",
//                         status: "scheduled",
//                       });
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Trips Table */}
//       {trips.length === 0 ? (
//         <div className="alert alert-warning">No trips found.</div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>#</th>
//                 <th>Bus Number</th>
//                 <th>Route</th>
//                 <th>Departure</th>
//                 <th>Arrival</th>
//                 <th>Price/Seat</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {trips.map((trip, idx) => (
//                 <tr key={trip._id}>
//                   <td>{idx + 1}</td>
//                   <td>{trip.bus?.busNumber || "N/A"}</td>
//                   <td>
//                     {trip.route
//                       ? `${trip.route.startPoint} → ${trip.route.endPoint}`
//                       : "N/A"}
//                   </td>
//                   <td>{trip.departureTime ? new Date(trip.departureTime).toLocaleString() : "—"}</td>
//                   <td>{trip.arrivalTime ? new Date(trip.arrivalTime).toLocaleString() : "—"}</td>
//                   <td>{trip.pricePerSeat}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         trip.status === "scheduled"
//                           ? "bg-success"
//                           : trip.status === "cancelled"
//                           ? "bg-danger"
//                           : "bg-secondary"
//                       }`}
//                     >
//                       {trip.status}
//                     </span>
//                   </td>
//                   <td>
//                     <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(trip)}>
//                       Edit
//                     </button>
//                     <button className="btn btn-sm btn-danger" onClick={() => handleDelete(trip._id)}>
//                       Cancel
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


import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OperatorTrips() {
  const [trips, setTrips] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bus: "",
    route: "",
    departureTime: "",
    arrivalTime: "",
    pricePerSeat: "",
    status: "scheduled",
  });
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const operatorId = user._id || null;

  useEffect(() => {
    if (!operatorId) return;
    fetchTrips();
    fetchBuses();
    fetchRoutes();
  }, [operatorId]);

  const fetchTrips = async () => {
    try {
      const res = await api.get(`/trips?operator=${operatorId}`);
      setTrips(res.data);
    } catch {
      toast.error("Failed to fetch trips");
    } finally {
      setLoading(false);
    }
  };

  const fetchBuses = async () => {
    try {
      const res = await api.get(`/buses?operator=${operatorId}`);
      setBuses(res.data);
    } catch {
      toast.error("Failed to fetch buses");
    }
  };

  const fetchRoutes = async () => {
    try {
      const res = await api.get("/routes");
      setRoutes(res.data);
    } catch {
      toast.error("Failed to fetch routes");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, pricePerSeat: Number(formData.pricePerSeat) };

    try {
      editId
        ? await api.put(`/trips/${editId}`, payload)
        : await api.post("/trips", payload);

      toast.success(editId ? "Trip updated" : "Trip added");
      setEditId(null);
      setFormData({
        bus: "",
        route: "",
        departureTime: "",
        arrivalTime: "",
        pricePerSeat: "",
        status: "scheduled",
      });
      fetchTrips();
    } catch {
      toast.error("Error saving trip");
    }
  };

  const handleEdit = (trip) => {
    setEditId(trip._id);
    setFormData({
      bus: trip.bus?._id || "",
      route: trip.route?._id || "",
      departureTime: trip.departureTime?.slice(0, 16),
      arrivalTime: trip.arrivalTime?.slice(0, 16),
      pricePerSeat: trip.pricePerSeat,
      status: trip.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this trip?")) return;
    await api.delete(`/trips/${id}`);
    toast.success("Trip cancelled");
    fetchTrips();
  };

  if (loading) return <div className="text-center py-5">Loading trips...</div>;

  return (
    <main className="container-fluid px-4 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">My Trips</h4>
          <p className="text-muted mb-0">Manage and schedule your trips</p>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* Add/Edit Trip */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white fw-semibold">
          {editId ? "Edit Trip" : "Add New Trip"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
                <select className="form-select" name="bus" value={formData.bus} onChange={handleChange} required>
                  <option value="">Select Bus</option>
                  {buses.map((b) => (
                    <option key={b._id} value={b._id}>{b.busNumber}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <select className="form-select" name="route" value={formData.route} onChange={handleChange} required>
                  <option value="">Select Route</option>
                  {routes.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.startPoint} → {r.endPoint}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <input type="datetime-local" className="form-control" name="departureTime" value={formData.departureTime} onChange={handleChange} required />
              </div>

              <div className="col-md-3">
                <input type="datetime-local" className="form-control" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required />
              </div>

              <div className="col-md-2">
                <input type="number" className="form-control" placeholder="Price / Seat" name="pricePerSeat" value={formData.pricePerSeat} onChange={handleChange} required />
              </div>

              <div className="col-md-2">
                <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="col-md-2">
                <button className="btn btn-success w-100">
                  {editId ? "Update" : "Add"}
                </button>
              </div>

              {editId && (
                <div className="col-md-2">
                  <button type="button" className="btn btn-secondary w-100" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Trips Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-semibold">
          Scheduled Trips
        </div>

        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Bus</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t, i) => (
                <tr key={t._id}>
                  <td>{i + 1}</td>
                  <td className="fw-semibold">{t.bus?.busNumber}</td>
                  <td>{t.route?.startPoint} → {t.route?.endPoint}</td>
                  <td>{new Date(t.departureTime).toLocaleString()}</td>
                  <td>{new Date(t.arrivalTime).toLocaleString()}</td>
                  <td>₹{t.pricePerSeat}</td>
                  <td>
                    <span className={`badge ${
                      t.status === "scheduled" ? "bg-success" :
                      t.status === "cancelled" ? "bg-danger" : "bg-secondary"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t._id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
