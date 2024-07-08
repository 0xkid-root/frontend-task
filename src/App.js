// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import Dashboard from "./components/Dashboard";
// import Logout from "./components/Logout";
// import { Navigate } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const App = () => {
//     // const isAuthenticated = !!localStorage.getItem("token");

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" index element={<LoginForm />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/logout" element={<Logout />} />


//         {/*
//         <Route
//           path="/dashboard"
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
//         />
//          */}
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//       <ToastContainer />

//     </Router>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import AuthGuard from "./auth/AuthGuard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;


