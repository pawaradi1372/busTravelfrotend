// import React, { useEffect, useState } from "react";
// import api from "../api/axiosInstance";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// export default function AdminRoutes() {
//   const [routes, setRoutes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     startPoint: "",
//     endPoint: "",
//     stops: "",
//     distance: "",
//     duration: ""
//   });
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchRoutes();
//   }, []);

//   const fetchRoutes = async () => {
//     try {
//       const res = await api.get("/routes");
//       setRoutes(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch routes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await api.put(`/routes/${editId}`, {
//           ...formData,
//           stops: formData.stops.split(",").map(s => s.trim())
//         });
//         toast.success("Route updated successfully");
//       } else {
//         await api.post("/routes", {
//           ...formData,
//           stops: formData.stops.split(",").map(s => s.trim())
//         });
//         toast.success("Route added successfully");
//       }
//       setFormData({ startPoint: "", endPoint: "", stops: "", distance: "", duration: "" });
//       setEditId(null);
//       fetchRoutes();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Error saving route");
//     }
//   };

//   const handleEdit = (route) => {
//     setEditId(route._id);
//     setFormData({
//       startPoint: route.startPoint,
//       endPoint: route.endPoint,
//       stops: route.stops.join(", "),
//       distance: route.distance || "",
//       duration: route.duration || ""
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this route?")) return;
//     try {
//       await api.delete(`/routes/${id}`);
//       toast.success("Route deleted successfully");
//       fetchRoutes();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete route");
//     }
//   };

//   if (loading) return <div className="text-center py-5">Loading routes...</div>;

//   return (
//     <main className="container py-4">
//      <button
//         className="btn btn-secondary mb-3"
//         onClick={() => navigate(-1)} // <-- navigate back
//       >
//         &larr; Back
//       </button>
//       <h3 className="mb-4">Manage Routes</h3>

//       {/* Add / Edit Form */}
//       <div className="card mb-4">
//         <div className="card-body">
//           <h5>{editId ? "Edit Route" : "Add Route"}</h5>
//           <form onSubmit={handleSubmit}>
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Start Point"
//                   name="startPoint"
//                   value={formData.startPoint}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="End Point"
//                   name="endPoint"
//                   value={formData.endPoint}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Stops (comma separated)"
//                   name="stops"
//                   value={formData.stops}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col-md-2">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Distance (km)"
//                   name="distance"
//                   value={formData.distance}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col-md-2">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Duration (e.g., 5h 30m)"
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col-md-2">
//                 <button type="submit" className="btn btn-primary w-100">
//                   {editId ? "Update" : "Add"} Route
//                 </button>
//               </div>
//               {editId && (
//                 <div className="col-md-2">
//                   <button
//                     type="button"
//                     className="btn btn-secondary w-100"
//                     onClick={() => {
//                       setEditId(null);
//                       setFormData({ startPoint: "", endPoint: "", stops: "", distance: "", duration: "" });
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

//       {/* Routes Table */}
//       {routes.length === 0 ? (
//         <div className="alert alert-warning">No routes found.</div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>#</th>
//                 <th>Start Point</th>
//                 <th>End Point</th>
//                 <th>Stops</th>
//                 <th>Distance (km)</th>
//                 <th>Duration</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {routes.map((route, idx) => (
//                 <tr key={route._id}>
//                   <td>{idx + 1}</td>
//                   <td>{route.startPoint}</td>
//                   <td>{route.endPoint}</td>
//                   <td>{route.stops.join(", ")}</td>
//                   <td>{route.distance || "-"}</td>
//                   <td>{route.duration || "-"}</td>
//                   <td>
//                     <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(route)}>Edit</button>
//                     <button className="btn btn-sm btn-danger" onClick={() => handleDelete(route._id)}>Delete</button>
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

export default function AdminRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    startPoint: "",
    endPoint: "",
    stops: "",
    distance: "",
    duration: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await api.get("/routes");
      setRoutes(res.data);
    } catch {
      toast.error("Failed to fetch routes");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        stops: formData.stops.split(",").map(s => s.trim())
      };

      editId
        ? await api.put(`/routes/${editId}`, payload)
        : await api.post("/routes", payload);

      toast.success(editId ? "Route updated" : "Route added");

      setFormData({
        startPoint: "",
        endPoint: "",
        stops: "",
        distance: "",
        duration: ""
      });
      setEditId(null);
      fetchRoutes();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const handleEdit = route => {
    setEditId(route._id);
    setFormData({
      startPoint: route.startPoint,
      endPoint: route.endPoint,
      stops: route.stops.join(", "),
      distance: route.distance || "",
      duration: route.duration || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this route?")) return;
    try {
      await api.delete(`/routes/${id}`);
      toast.success("Route deleted");
      fetchRoutes();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <main className="container-fluid px-4 py-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Route Management</h4>
          <p className="text-muted mb-0">Create & manage travel routes</p>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* FORM CARD */}
      <div className="card border-0 shadow-sm mb-5">
        <div className="card-body">
          <h6 className="fw-bold mb-3">
            {editId ? "Edit Route" : "Add New Route"}
          </h6>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <input className="form-control" placeholder="Start Point"
                  name="startPoint" value={formData.startPoint}
                  onChange={handleChange} required />
              </div>

              <div className="col-md-4">
                <input className="form-control" placeholder="End Point"
                  name="endPoint" value={formData.endPoint}
                  onChange={handleChange} required />
              </div>

              <div className="col-md-4">
                <input className="form-control" placeholder="Stops (comma separated)"
                  name="stops" value={formData.stops}
                  onChange={handleChange} />
              </div>

              <div className="col-md-3">
                <input type="number" className="form-control"
                  placeholder="Distance (km)" name="distance"
                  value={formData.distance} onChange={handleChange} />
              </div>

              <div className="col-md-3">
                <input className="form-control"
                  placeholder="Duration (eg: 6h 30m)" name="duration"
                  value={formData.duration} onChange={handleChange} />
              </div>

              <div className="col-md-3">
                <button className="btn btn-primary w-100">
                  {editId ? "Update Route" : "Add Route"}
                </button>
              </div>

              {editId && (
                <div className="col-md-3">
                  <button type="button" className="btn btn-outline-secondary w-100"
                    onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* ROUTE CARDS */}
      <div className="row g-4">
        {routes.map(route => (
          <div key={route._id} className="col-xl-4 col-md-6">
            <div className="card border-0 shadow-sm h-100 route-card">
              <div className="card-body">

                <div className="d-flex justify-content-between mb-2">
                  <span className="badge bg-primary">Route</span>
                  <div>
                    <button
                      className="btn btn-sm btn-light me-1"
                      onClick={() => handleEdit(route)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light text-danger"
                      onClick={() => handleDelete(route._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>

                <h6 className="fw-bold mb-1">
                  {route.startPoint}
                  <i className="bi bi-arrow-right mx-2 text-muted"></i>
                  {route.endPoint}
                </h6>

                <p className="small text-muted mb-3">
                  Stops: {route.stops.length ? route.stops.join(", ") : "Direct"}
                </p>

                <div className="d-flex gap-2">
                  <span className="badge bg-light text-dark">
                    🚏 {route.stops.length} stops
                  </span>
                  <span className="badge bg-light text-dark">
                    📏 {route.distance || "-"} km
                  </span>
                  <span className="badge bg-light text-dark">
                    ⏱ {route.duration || "-"}
                  </span>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
