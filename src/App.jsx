
import { Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import CampusCore from "./components/CampusCore";
import HelpAndSupport from "./pages/HelpAndSupport";

function App() {
  return (

      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/campus-core" element={<CampusCore />} />
              <Route path="/help-and-support" element={<HelpAndSupport />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}
export default App;
