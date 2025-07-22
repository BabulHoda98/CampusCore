// import {
//   LayoutDashboard,
//   Users,
//   BookText,
//   LogOut,
//   Settings
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-[#1e144f] text-white flex flex-col justify-between fixed">
//       {/* Logo Section */}
//       <div>
//         <div className="p-4 text-2xl font-bold flex items-center space-x-2">
//           🎓 <span>Campus Core</span>
//         </div>

//         {/* Navigation */}
//         <nav className="mt-4 space-y-2 text-sm">
//           <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
//           <NavItem to="/organization" icon={<Users size={18} />} label="Organization" />
//           <NavItem to="/subscriptions" icon={<BookText size={18} />} label="Subscriptions" />
//           <NavItem to="/pricing" icon={<Users size={18} />} label="Pricing" />
//           <NavItem to="/announcement" icon={<Users size={18} />} label="Announcement" />
//           <NavItem to="/report" icon={<Users size={18} />} label="Report" />
//           <NavItem to="/notification" icon={<Users size={18} />} label="Notification" />
//           <NavItem to="/help-and-support" icon={<Users size={18} />} label="Help and Support" />
//         </nav>
//       </div>

//       {/* Settings and Logout */}
//       <div className="space-y-2 p-4 text-sm border-t border-gray-700">
//         <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
//         <NavItem
//           to="/logout"
//           icon={<LogOut size={18} />}
//           label="Logout Account"
//           textColor="text-red-400"
//         />
//       </div>
//     </div>
//   );
// };

// // NavItem with NavLink support and active route styling
// const NavItem = ({ icon, label, to, textColor = "text-white" }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-[#2d216d] rounded-md transition duration-200 ${
//         isActive ? "bg-[#2d216d] font-semibold" : ""
//       } ${textColor}`
//     }
//   >
//     {icon}
//     <span>{label}</span>
//   </NavLink>
// );

// export default Sidebar;
// -------------------------------------------------------------
import {
  LayoutDashboard,
  Users,
  BookText,
  LogOut,
  Settings,
  School,
  CreditCard,
  Tag,
  Megaphone,
  PieChart,
  Bell,
  HelpCircle,
  BookOpen
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#1e144f] text-white flex flex-col justify-between fixed">
      {/* Enhanced Logo Section */}
      <div>
        <div className="p-4 flex items-center space-x-3">
          <div className="bg-gray-200 p-1 rounded-full shadow-lg">
            {/* <School size={28} className="text-white" /> */}
            <span size={28} className="text-white">🎓</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Campus Core</h1>
          </div>
        </div>

        {/* Navigation with Correct Icons */}
        <nav className="mt-4 space-y-2 text-sm">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem to="/organization" icon={<Users size={18} />} label="Organization" />
          <NavItem to="/subscriptions" icon={<CreditCard size={18} />} label="Subscriptions" />
          <NavItem to="/pricing" icon={<Tag size={18} />} label="Pricing" />
          <NavItem to="/announcement" icon={<Megaphone size={18} />} label="Announcement" />
          <NavItem to="/report" icon={<PieChart size={18} />} label="Report" />
          <NavItem to="/notification" icon={<Bell size={18} />} label="Notification" />
          <NavItem to="/help-and-support" icon={<HelpCircle size={18} />} label="Help and Support" />
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

const NavItem = ({ icon, label, to, textColor = "text-white" }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-4 py-2.5 cursor-pointer hover:bg-[#2d216d] rounded-lg transition duration-200 ${
        isActive ? "bg-[#2d216d] font-semibold border-l-4 border-indigo-400" : ""
      } ${textColor}`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;