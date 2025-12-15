import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Common
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

// Passenger
import PassengerLogin from "./pages/PassengerLogin";
import PassengerRegister from "./pages/PassengerRegister";
import PassengerSearchBuses from "./Passenger/PassengerSearchBuses";
import BookNow from "./Passenger/BookNow";
import PaymentPage from "./Passenger/PaymentPage";
import MyBookings from "./Passenger/MyBookings";
import Receipt from "./Passenger/Receipt";

// Admin
import AdminLogin from "./pages/adminAuth/AdminLogin";
import AdminRegister from "./pages/adminAuth/AdminRegister";
import AdminRoutes from "./admin/AdminRoutes";
import AdminOperators from "./admin/AdminOperators";
import ManageOperators from "./admin/ManageOperators"; // FIXED ✔

// Operator
import OperatorLogin from "./pages/OperatorLogin";

import OperatorBuses from "./operator/OperatorBuses";
import OperatorTrips from "./operator/OperatorTrips";
import OperatorRevenue from "./operator/OperatorRevenue";

export default function App() {
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedRole && savedUser) {
      setToken(savedToken);
      setRole(savedRole);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  // Private route
  const PrivateRoute = ({ children }) =>
    token ? children : <Navigate to="/login" />;

  // Role-protected route
  const RoleProtectedRoute = ({ allowedRoles, children }) => {
    if (!token) return <Navigate to="/login" />;
    if (!allowedRoles.includes(role)) {
      alert("You do not have permission!");
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      {token && (
        <Header role={role} setRole={setRole} user={user} setUser={setUser} />
      )}

      <Routes>
        {/* ================= HOME / DASHBOARD ================= */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard role={role} user={user} />
            </PrivateRoute>
          }
        />

        {/* ================= OPERATOR AUTH ================= */}
        <Route
          path="/operator/login"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <OperatorLogin
                setRole={setRole}
                setUser={(u) => {
                  setUser(u);
                  setToken(localStorage.getItem("token"));
                }}
              />
            )
          }
        />

        

        {/* ================= OPERATOR PRIVATE PAGES ================= */}
        <Route
          path="/operator/buses"
          element={
            <RoleProtectedRoute allowedRoles={["operator"]}>
              <OperatorBuses />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/operator/trips"
          element={
            <RoleProtectedRoute allowedRoles={["operator"]}>
              <OperatorTrips />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/operator/revenue"
          element={
            <RoleProtectedRoute allowedRoles={["operator"]}>
              <OperatorRevenue />
            </RoleProtectedRoute>
          }
        />

        {/* ================= ADMIN AUTH ================= */}
        <Route
          path="/admin/login"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <AdminLogin
                setRole={setRole}
                setUser={(u) => {
                  setUser(u);
                  setToken(localStorage.getItem("token"));
                }}
              />
            )
          }
        />

        <Route
          path="/admin/register"
          element={token ? <Navigate to="/" /> : <AdminRegister />}
        />

        {/* ================= ADMIN PRIVATE PAGES ================= */}
        <Route
          path="/admin/routes"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminRoutes />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/revenue"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminOperators />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/create-operator"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <ManageOperators />
            </RoleProtectedRoute>
          }
        />

        {/* ================= PASSENGER ROUTES ================= */}
        <Route
          path="/passenger/search"
          element={
            <RoleProtectedRoute allowedRoles={["passenger"]}>
              <PassengerSearchBuses />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/passenger/book/:tripId"
          element={
            <RoleProtectedRoute allowedRoles={["passenger"]}>
              <BookNow />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/passenger/payment/:bookingId"
          element={
            <RoleProtectedRoute allowedRoles={["passenger"]}>
              <PaymentPage />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/passenger/bookings"
          element={
            <RoleProtectedRoute allowedRoles={["passenger"]}>
              <MyBookings />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/passenger/bookings/receipt/:bookingId"
          element={
            <RoleProtectedRoute allowedRoles={["passenger"]}>
              <Receipt />
            </RoleProtectedRoute>
          }
        />

        {/* ================= PASSENGER AUTH ================= */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <PassengerLogin
                setRole={setRole}
                setUser={(u) => {
                  setUser(u);
                  setToken(u ? localStorage.getItem("token") : "");
                }}
              />
            )
          }
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <PassengerRegister />}
        />

        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}




// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import OperatorBuses from "./operator/OperatorBuses";
// import OperatorTrips from "./operator/OperatorTrips";
// import OperatorRevenue from "./operator/OperatorRevenue";

// import AdminRoutes from "./admin/AdminRoutes";
// import AdminOperators from "./admin/AdminOperators";

// import PassengerSearchBuses from "./Passenger/PassengerSearchBuses";
// import BookNow from "./Passenger/BookNow"; // import the BookNow page
// import PaymentPage from "./Passenger/PaymentPage"; // import the PaymentPage
// import MyBookings from "./Passenger/MyBookings"; // import MyBookings page
// import Receipt from "./Passenger/Receipt";

// export default function App() {
//   const [role, setRole] = useState("");
//   const [token, setToken] = useState("");
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedRole = localStorage.getItem("role");
//     const savedUser = localStorage.getItem("user");

//     if (savedToken && savedRole && savedUser) {
//       setToken(savedToken);
//       setRole(savedRole);
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   if (loading) return <div className="text-center py-5">Loading...</div>;

//   // Private route for authenticated users
//   const PrivateRoute = ({ children }) =>
//     token ? children : <Navigate to="/login" />;

//   // Role-protected route
//   const RoleProtectedRoute = ({ allowedRoles, children }) => {
//     if (!token) return <Navigate to="/login" />;
//     if (!allowedRoles.includes(role)) {
//       alert("You do not have permission to access this page!");
//       return <Navigate to="/" />;
//     }
//     return children;
//   };

//   return (
//     <Router>
//       {token && (
//         <Header role={role} setRole={setRole} user={user} setUser={setUser} />
//       )}
//       <Routes>
//         {/* Dashboard */}
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <Dashboard role={role} user={user} />
//             </PrivateRoute>
//           }
//         />
//         {/* Operator buses page */}
//         <Route
//           path="/operator/buses"
//           element={
//             <RoleProtectedRoute allowedRoles={["operator"]}>
//               <OperatorBuses />
//             </RoleProtectedRoute>
//           }
//         />
//         <Route
//           path="/operator/trips"
//           element={
//             <RoleProtectedRoute allowedRoles={["operator"]}>
//               <OperatorTrips />
//             </RoleProtectedRoute>
//           }
//         />
//         <Route
//           path="/operator/revenue"
//           element={
//             <RoleProtectedRoute allowedRoles={["operator"]}>
//               <OperatorRevenue />
//             </RoleProtectedRoute>
//           }
//         />
//         {/* Admin routes management page */} {/* Admin Pages */}
//         <Route
//           path="/admin/routes"
//           element={
//             <RoleProtectedRoute allowedRoles={["admin"]}>
//               <AdminRoutes />
//             </RoleProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/operators"
//           element={
//             <RoleProtectedRoute allowedRoles={["admin"]}>
//               <AdminOperators />
//             </RoleProtectedRoute>
//           }
//         />
//         <Route
//           path="/passenger/search" // ✅ corrected
//           element={
//             <RoleProtectedRoute allowedRoles={["passenger"]}>
//               <PassengerSearchBuses />
//             </RoleProtectedRoute>
//           }
//         />
//         <Route
//           path="/passenger/book/:tripId" // pass tripId as param
//           element={
//             <RoleProtectedRoute allowedRoles={["passenger"]}>
//               <BookNow />
//             </RoleProtectedRoute>
//           }
//         />
//         <Route
//           path="/passenger/payment/:bookingId"
//           element={
//             <RoleProtectedRoute allowedRoles={["passenger"]}>
//               <PaymentPage />
//             </RoleProtectedRoute>
//           }
//         />
//         <Route
//           path="/passenger/bookings"
//           element={
//             <RoleProtectedRoute allowedRoles={["passenger"]}>
//               <MyBookings />
//             </RoleProtectedRoute>
//           }
//         />
//         <Route
//           path="/passenger/bookings/receipt/:bookingId"
//           element={
//             <RoleProtectedRoute allowedRoles={["passenger"]}>
//               <Receipt />
//             </RoleProtectedRoute>
//           }
//         />
//         {/* Auth routes */}
//         <Route
//           path="/login"
//           element={
//             token ? (
//               <Navigate to="/" />
//             ) : (
//               <Login
//                 setRole={(r) => setRole(r)}
//                 setUser={(u) => {
//                   setUser(u);
//                   setToken(u ? localStorage.getItem("token") : "");
//                 }}
//               />
//             )
//           }
//         />
//         <Route
//           path="/register"
//           element={token ? <Navigate to="/" /> : <Register />}
//         />
//         <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
//       </Routes>
//     </Router>
//   );
// }
