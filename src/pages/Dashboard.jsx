import React, { useState } from 'react';
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import SubscriptionOverview from "../components/SubscriptionOverview";
import RecentlyJoined from "../components/RecentlyJoined";
import Alerts from "../components/Alerts";
import {
  Briefcase,
  Bell,
  DollarSign,
  CreditCard,
  BarChart2,
  ChevronDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const revenueData = [
  { name: 'J', revenue2023: 40, revenue2022: 35 },
  { name: 'F', revenue2023: 60, revenue2022: 50 },
  { name: 'M', revenue2023: 75, revenue2022: 65 },
  { name: 'A', revenue2023: 55, revenue2022: 48 },
  { name: 'M', revenue2023: 80, revenue2022: 60 },
  { name: 'J', revenue2023: 65, revenue2022: 58 },
  { name: 'J', revenue2023: 90, revenue2022: 72 },
  { name: 'A', revenue2023: 70, revenue2022: 60 },
  { name: 'S', revenue2023: 85, revenue2022: 68 },
  { name: 'O', revenue2023: 78, revenue2022: 64 },
  { name: 'N', revenue2023: 92, revenue2022: 70 },
  { name: 'D', revenue2023: 88, revenue2022: 75 },
];

const buyData = [
  { name: 'J', value: 25 }, { name: 'F', value: 30 }, { name: 'M', value: 45 },
  { name: 'A', value: 32 }, { name: 'M', value: 50 }, { name: 'J', value: 40 },
  { name: 'J', value: 60 }, { name: 'A', value: 48 }, { name: 'S', value: 52 },
  { name: 'O', value: 56 }, { name: 'N', value: 62 }, { name: 'D', value: 59 },
];

const payData = [
  { name: 'J', value: 20 }, { name: 'F', value: 28 }, { name: 'M', value: 38 },
  { name: 'A', value: 30 }, { name: 'M', value: 45 }, { name: 'J', value: 35 },
  { name: 'J', value: 55 }, { name: 'A', value: 42 }, { name: 'S', value: 50 },
  { name: 'O', value: 54 }, { name: 'N', value: 58 }, { name: 'D', value: 60 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');

  const stats = [
    {
      title: "Organisations", value: "150", icon: <Briefcase size={24} />,
      change: "+12.3%", changeType: "increase", description: "Total registered organizations"
    },
    {
      title: "Requests", value: "5", icon: <Bell size={24} />,
      change: "+2.1%", changeType: "increase", description: "Pending approval requests"
    },
    {
      title: "Total Revenue", value: "$9,900", icon: <DollarSign size={24} />,
      change: "+18.7%", changeType: "increase", description: "All-time revenue generated"
    },
    {
      title: "Monthly Earning", value: "$8,999", icon: <CreditCard size={24} />,
      change: "-3.2%", changeType: "decrease", description: "Revenue this month"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen ml-64">
      <Header />

      <div className="px-6 py-2 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            {/* <p className="text-sm text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p> */}
          </div>

          <div className="mt-2 md:mt-0 flex space-x-3 items-center">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm">
              <BarChart2 size={16} className="mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-2">
          {['overview', 'analytics', 'reports', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium relative ${activeTab === tab ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>}
            </button>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Area */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-0">
          <div className="lg:col-span-2 space-y-2">
            <SubscriptionOverview />
            {/* <RecentlyJoined /> */}

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-2 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
                <p className="text-sm text-gray-500">Monthly revenue performance</p>
              </div>
              <div className="p-5 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue2023" fill="#6366f1" name="2023 Revenue" />
                    <Bar dataKey="revenue2022" fill="#c7d2fe" name="2022 Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Buy & Pay Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{
                title: "Buy Overview",
                data: buyData,
                fill: "#10b981",
                label: "Buy Count"
              }, {
                title: "Pay Overview",
                data: payData,
                fill: "#f59e0b",
                label: "Pay Count"
              }].map((chart, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">{chart.title}</h3>
                    <p className="text-sm text-gray-500">Monthly {chart.title.toLowerCase().replace(' overview', '')} trend</p>
                  </div>
                  <div className="p-5 h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill={chart.fill} name={chart.label} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <RecentlyJoined />
            <Alerts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
