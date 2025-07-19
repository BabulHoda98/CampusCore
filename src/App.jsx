import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/admin-dashboard");

  return (
    <div className="flex">
      {isDashboard && <Sidebar />}
      <div className={isDashboard ? "flex-1" : "w-full"}>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;

