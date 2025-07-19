import {
  LayoutDashboard,
  Users,
  BookText,
  LogOut,
  Settings
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#1e144f] text-white flex flex-col justify-between fixed">
      {/* Logo Section */}
      <div>
        <div className="p-4 text-2xl font-bold flex items-center space-x-2">
          🎓 <span>Campus Core</span>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-2 text-sm">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem to="/students" icon={<Users size={18} />} label="Student Management" />
          <NavItem to="/content" icon={<BookText size={18} />} label="Content Management" />
          <NavItem to="/faculty" icon={<Users size={18} />} label="Faculty Management" />
          <NavItem to="/parents" icon={<Users size={18} />} label="Parent Login" />
          <NavItem to="/team" icon={<Users size={18} />} label="Team Management" />
          <NavItem to="/subscriptions" icon={<Users size={18} />} label="Subscription" />
        </nav>
      </div>

      {/* Settings and Logout */}
      <div className="space-y-2 p-4 text-sm border-t border-gray-700">
        <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
        <NavItem
          to="/logout"
          icon={<LogOut size={18} />}
          label="Logout Account"
          textColor="text-red-400"
        />
      </div>
    </div>
  );
};

// NavItem with NavLink support and active route styling
const NavItem = ({ icon, label, to, textColor = "text-white" }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-[#2d216d] rounded-md transition duration-200 ${
        isActive ? "bg-[#2d216d] font-semibold" : ""
      } ${textColor}`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;