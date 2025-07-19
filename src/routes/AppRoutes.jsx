import { Routes, Route } from "react-router-dom";
import CampusCore from "../components/CampusCore";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CampusCore />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
