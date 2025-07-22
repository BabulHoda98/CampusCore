import { Routes, Route } from "react-router-dom";
import CampusCore from "../components/CampusCore";
import Dashboard from "../pages/Dashboard";
import HelpAndSupport from "../pages/HelpAndSupport";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CampusCore />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
