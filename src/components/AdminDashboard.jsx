import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FileText, Briefcase, User, Users2, 
  CreditCard, Settings, HelpCircle, LogOut, Search, Bell, 
  UserCircle, CalendarDays, BarChart3, DollarSign, Building, 
  ClipboardList, TrendingUp, Plus, Edit, Trash, X, Menu, 
  ChevronDown, ChevronUp, Filter, ArrowUpDown, MoreVertical,
  ShoppingCart, PieChart, BarChart2
} from 'lucide-react';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [organizations, setOrganizations] = useState([
    { id: 1, name: 'Greenwood High School', contact: 'Jane Doe', date: '2024-07-01', status: 'Active', subscription: 'Premium' },
    { id: 2, name: 'City University', contact: 'John Smith', date: '2024-06-28', status: 'Active', subscription: 'Standard' },
    { id: 3, name: 'Valley Elementary', contact: 'Emily White', date: '2024-06-25', status: 'Active', subscription: 'Basic' },
    { id: 4, name: 'Northwood College Prep', contact: 'Michael Brown', date: '2024-06-01', status: 'Active', subscription: 'Premium' },
    { id: 5, name: 'Springfield Academy', contact: 'Sarah Lee', date: '2024-05-15', status: 'Active', subscription: 'Standard' },
    { id: 6, name: 'Westfield Institute', contact: 'Robert Chen', date: '2024-04-10', status: 'Suspended', subscription: 'Basic' },
    { id: 7, name: 'Eastside Technical', contact: 'Lisa Johnson', date: '2024-03-22', status: 'Expired', subscription: 'Premium' },
    { id: 8, name: 'Central Learning Center', contact: 'David Wilson', date: '2024-02-18', status: 'Active', subscription: 'Standard' },
  ]);
  
  // Enhanced state management
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    status: 'Active',
    subscription: 'Standard'
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    status: 'All',
    subscription: 'All'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Enhanced stats with real data
  const stats = [
    { title: 'Organisations', value: organizations.length, icon: <Building size={24} />, color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300', change: '+12%' },
    { title: 'Requests', value: 24, icon: <ClipboardList size={24} />, color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', change: '+5%' },
    { title: 'Total Revenue', value: '$ 24,500', icon: <DollarSign size={24} />, color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', change: '+18%' },
    { title: 'Monthly Earnings', value: '$ 8,999', icon: <TrendingUp size={24} />, color: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300', change: '+7%' },
  ];

  // Enhanced subscription data
  const subscriptions = [
    { status: 'Active', count: 120, color: 'bg-emerald-500', percentage: 75 },
    { status: 'Expiring Soon', count: 15, color: 'bg-amber-400', percentage: 10 },
    { status: 'Expired', count: 8, color: 'bg-rose-500', percentage: 5 },
    { status: 'Inactive', count: 5, color: 'bg-slate-400', percentage: 3 },
  ];

  // Enhanced subscription alerts
  const subscriptionAlerts = [
    { title: 'Sun Rise Academy', daysLeft: 3, color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700' },
    { title: 'Maple Leaf School', daysLeft: 7, color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700' },
    { title: 'Riverdale College', daysLeft: 10, color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700' },
    { title: 'Brighton High', daysLeft: 14, color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700' },
  ];

  // New chart data states
  const [revenueData] = useState([
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 9800, expenses: 2000 },
    { month: 'Apr', revenue: 3908, expenses: 2780 },
    { month: 'May', revenue: 4800, expenses: 1890 },
    { month: 'Jun', revenue: 3800, expenses: 2390 },
    { month: 'Jul', revenue: 4300, expenses: 3490 },
  ]);

  const [paymentMethods] = useState([
    { name: 'Credit Card', value: 70, color: 'bg-indigo-500' },
    { name: 'PayPal', value: 20, color: 'bg-blue-500' },
    { name: 'Bank Transfer', value: 8, color: 'bg-emerald-500' },
    { name: 'Crypto', value: 2, color: 'bg-amber-500' },
  ]);

  const [purchaseCategories] = useState([
    { name: 'Software', value: 45, color: 'bg-violet-500' },
    { name: 'Hardware', value: 30, color: 'bg-rose-500' },
    { name: 'Services', value: 15, color: 'bg-sky-500' },
    { name: 'Training', value: 10, color: 'bg-lime-500' },
  ]);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Organization CRUD Operations
  const handleCreateOrg = () => {
    setCurrentOrg(null);
    setFormData({
      name: '',
      contact: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Active',
      subscription: 'Standard'
    });
    setShowOrgModal(true);
  };

  const handleEditOrg = (org) => {
    setCurrentOrg(org);
    setFormData({ ...org });
    setShowOrgModal(true);
  };

  const handleDeleteOrg = (id) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      setOrganizations(organizations.filter(org => org.id !== id));
    }
  };

  const handleSubmitOrg = (e) => {
    e.preventDefault();
    if (currentOrg) {
      // Update existing organization
      setOrganizations(organizations.map(org => 
        org.id === currentOrg.id ? { ...formData, id: org.id } : org
      ));
    } else {
      // Create new organization
      const newId = Math.max(...organizations.map(o => o.id), 0) + 1;
      setOrganizations([...organizations, { ...formData, id: newId }]);
    }
    setShowOrgModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Sorting functionality
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedOrganizations = React.useMemo(() => {
    if (!sortConfig.key) return organizations;
    
    return [...organizations].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [organizations, sortConfig]);

  // Filtering functionality
  const filteredOrganizations = React.useMemo(() => {
    return sortedOrganizations.filter(org => {
      const matchesSearch = 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.contact.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        activeFilters.status === 'All' || org.status === activeFilters.status;
      
      const matchesSubscription = 
        activeFilters.subscription === 'All' || org.subscription === activeFilters.subscription;
      
      return matchesSearch && matchesStatus && matchesSubscription;
    });
  }, [sortedOrganizations, searchTerm, activeFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);
  const paginatedOrganizations = filteredOrganizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, view: 'dashboard' },
    { name: 'Organization Management', icon: <Building size={20} />, view: 'organizations' },
    { name: 'Student Management', icon: <Users size={20} />, view: 'students' },
    { name: 'Content Management', icon: <FileText size={20} />, view: 'content' },
    { name: 'Faculty Management', icon: <Briefcase size={20} />, view: 'faculty' },
    { name: 'Parent Login', icon: <User size={20} />, view: 'parent' },
    { name: 'Team Management', icon: <Users2 size={20} />, view: 'team' },
    { name: 'Subscription', icon: <CreditCard size={20} />, view: 'subscription' },
  ];

  const settingsItems = [
    { name: 'Settings', icon: <Settings size={20} />, view: 'settings' },
    { name: 'Help', icon: <HelpCircle size={20} />, view: 'help' },
  ];

  // Theme classes
  const themeClasses = {
    background: darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800',
    card: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100',
    header: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100',
    sidebar: darkMode ? 'from-slate-900 to-slate-800' : 'from-slate-800 to-slate-900',
    input: darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-800',
    tableHeader: darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-50 text-slate-500',
    tableRow: darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-50',
    pagination: darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
  };

  // Chart components
  const RevenueBarChart = () => {
    const maxValue = Math.max(...revenueData.map(d => Math.max(d.revenue, d.expenses)));
    
    return (
      <div className="w-full h-64 flex flex-col">
        <div className="flex-1 flex items-end space-x-2 justify-between">
          {revenueData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex items-end justify-center space-x-1 w-full">
                <div 
                  className="w-3/5 bg-indigo-500 rounded-t hover:bg-indigo-600 transition-colors duration-200 border border-red-500 "
                  style={{ height: `${(item.revenue / maxValue) * 100}%` }}
                  title={`Revenue: $${item.revenue}`}
                ></div>
                <div 
                  className="w-2/5 bg-rose-500 rounded-t hover:bg-rose-600 transition-colors duration-200"
                  style={{ height: `${(item.expenses / maxValue) * 100}%` }}
                  title={`Expenses: $${item.expenses}`}
                ></div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-500 rounded mr-2"></div>
            <span className="text-xs text-slate-600 dark:text-slate-300">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-rose-500 rounded mr-2"></div>
            <span className="text-xs text-slate-600 dark:text-slate-300">Expenses</span>
          </div>
        </div>
      </div>
    );
  };

  const DonutChart = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let accumulated = 0;
    
    return (
      <div className="w-full">
        <div className="relative mx-auto w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.map((item, index) => {
              const start = (accumulated / total) * 100;
              accumulated += item.value;
              const end = (accumulated / total) * 100;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={item.color.replace('bg-', '')}
                  strokeWidth="20"
                  strokeDasharray={`${end - start} ${100 - (end - start)}`}
                  strokeDashoffset={25 - start}
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-500 ease-out"
                />
              );
            })}
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="white"
              className="dark:fill-slate-800"
            />
            <text 
              x="50" 
              y="50" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="text-lg font-bold fill-slate-800 dark:fill-slate-200"
            >
              {total}%
            </text>
          </svg>
        </div>
        
        <div className="mt-4">
          <h3 className="text-center font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h3>
          <div className="grid grid-cols-2 gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <div>{item.name}</div>
                  <div className="font-medium">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex min-h-screen font-sans ${themeClasses.background}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && mobileView && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b ${themeClasses.sidebar} shadow-lg p-6 flex flex-col rounded-r-xl transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center mb-10">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">🎓</div>
          <h2 className="text-xl font-bold text-white">Campus Core</h2>
        </div>

        <nav className="flex-grow">
          <p className="text-xs font-semibold text-slate-400 uppercase mb-4">MAIN</p>
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => {
                    setCurrentView(item.view);
                    if (mobileView) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center p-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-200 ${
                    currentView === item.view ? 'bg-indigo-600 text-white font-medium' : ''
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <p className="text-xs font-semibold text-slate-400 uppercase mt-8 mb-4">SETTINGS</p>
          <ul>
            {settingsItems.map((item, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => {
                    setCurrentView(item.view);
                    if (mobileView) setSidebarOpen(false);
                  }}
                  className="w-full flex items-center p-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <button className="w-full flex items-center p-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-rose-200 transition-colors duration-200">
            <LogOut size={20} />
            <span className="ml-3">Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className={`${themeClasses.header} shadow-sm p-4 md:p-6 flex justify-between items-center rounded-bl-xl border-b`}>
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} className="text-slate-600 dark:text-slate-300" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
                {currentView === 'organizations' 
                  ? 'Organization Management' 
                  : 'Welcome Admin,'}
              </h1>
              {currentView === 'dashboard' && (
                <p className="text-slate-600 dark:text-slate-400">Here's quick Overview of Campus Core</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 rounded-lg border ${themeClasses.input}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
            </div>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? (
                <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-900">☀️</span>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-indigo-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">🌙</span>
                </div>
              )}
            </button>
            
            <button className="relative p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Bell size={20} className="text-slate-600 dark:text-slate-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                <UserCircle size={24} />
              </div>
              <span className="hidden md:inline text-slate-700 dark:text-slate-300 font-medium">Admin</span>
              <ChevronDown size={16} className="text-slate-500 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Search for mobile */}
          {mobileView && (
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search organizations..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${themeClasses.input}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
            </div>
          )}

          {currentView === 'dashboard' ? (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className={`rounded-xl shadow-sm p-4 md:p-6 flex items-center border ${themeClasses.card}`}>
                    <div className={`rounded-lg p-3 ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-slate-500 dark:text-slate-400">{stat.title}</p>
                      <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                        <TrendingUp size={14} className="mr-1" /> 
                        {stat.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Subscription Overview */}
                <div className="lg:col-span-2 rounded-xl shadow-sm p-4 md:p-6 border lg:order-1 ${themeClasses.card}">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Subscription Overview</h2>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">View All</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {subscriptions.map((sub, index) => (
                      <div key={index} className={`border rounded-lg p-4 hover:shadow transition-shadow duration-200 ${themeClasses.card}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-3 h-3 rounded-full ${sub.color}`}></div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{sub.percentage}%</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{sub.status}</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{sub.count}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Announcements */}
                <div className={`rounded-xl shadow-sm p-4 md:p-6 border lg:order-2 ${themeClasses.card}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Announcements</h2>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">See All</button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">New feature rollout next week!</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">2 hours ago</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">System maintenance on July 20th.</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Yesterday</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Happy holidays from Campus Core!</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Recently Joined Organizations */}
                <div className={`rounded-xl shadow-sm p-4 md:p-6 border ${themeClasses.card}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recently Joined Organizations</h2>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                      <thead className={themeClasses.tableHeader}>
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Organization
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Date Joined
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Contact Person
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {organizations.slice(0, 3).map((org) => (
                          <tr key={org.id} className={themeClasses.tableRow}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-slate-100">
                              {org.name}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                              {org.date}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                              {org.contact}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                org.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                org.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                                org.status === 'Suspended' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400' :
                                'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                              }`}>
                                {org.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Subscription Expiry Alerts */}
                <div className={`rounded-xl shadow-sm p-4 md:p-6 border ${themeClasses.card}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Subscription Expiry Alerts</h2>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">Manage</button>
                  </div>
                  <div className="space-y-4">
                    {subscriptionAlerts.map((alert, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${alert.color}`}>
                        <div className="flex items-center">
                          <CalendarDays size={20} className="mr-3 text-slate-500 dark:text-slate-400" />
                          <div>
                            <span className="font-medium text-slate-800 dark:text-slate-100">{alert.title}</span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400">{alert.daysLeft} days left</span>
                          </div>
                        </div>
                        <button className="px-3 py-1 text-sm font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200">
                          Renew
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Revenue Chart */}
                <div className={`lg:col-span-2 rounded-xl shadow-sm p-6 border ${themeClasses.card}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                      <BarChart2 size={20} className="mr-2 text-indigo-500" />
                      Revenue & Expenses
                    </h2>
                    <div className="flex space-x-2">
                      <button className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        Monthly
                      </button>
                      <button className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        Quarterly
                      </button>
                      <button className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        Yearly
                      </button>
                    </div>
                  </div>
                  <RevenueBarChart />
                  <div className="flex justify-between mt-4 text-sm text-slate-600 dark:text-slate-300">
                    <div>
                      <div className="font-medium">Total Revenue</div>
                      <div className="text-lg font-bold text-slate-800 dark:text-slate-100">$24,500</div>
                    </div>
                    <div>
                      <div className="font-medium">Total Expenses</div>
                      <div className="text-lg font-bold text-slate-800 dark:text-slate-100">$8,300</div>
                    </div>
                    <div>
                      <div className="font-medium">Net Profit</div>
                      <div className="text-lg font-bold text-emerald-500">$16,200</div>
                    </div>
                  </div>
                </div>
                
                {/* Payment & Purchase Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                  {/* Payment Methods */}
                  <div className={`rounded-xl shadow-sm p-6 border ${themeClasses.card}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                        <CreditCard size={20} className="mr-2 text-indigo-500" />
                        Payment Methods
                      </h2>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                        View Report
                      </button>
                    </div>
                    <DonutChart data={paymentMethods} title="Payment Distribution" />
                  </div>
                  
                  {/* Purchase Categories */}
                  <div className={`rounded-xl shadow-sm p-6 border ${themeClasses.card}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                        <ShoppingCart size={20} className="mr-2 text-indigo-500" />
                        Purchase Categories
                      </h2>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                        View Details
                      </button>
                    </div>
                    <DonutChart data={purchaseCategories} title="Spending by Category" />
                  </div>
                </div>
              </div>
            </>
          ) : currentView === 'organizations' ? (
            <div className={`rounded-xl shadow-sm p-4 md:p-6 border ${themeClasses.card}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Manage Organizations</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {filteredOrganizations.length} organizations found
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <button 
                    onClick={handleCreateOrg}
                    className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Organization
                  </button>
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex items-center">
                  <Filter size={16} className="text-slate-500 mr-2" />
                  <span className="text-sm text-slate-700 dark:text-slate-300 mr-3">Filter by:</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <select
                    value={activeFilters.status}
                    onChange={(e) => setActiveFilters({...activeFilters, status: e.target.value})}
                    className={`px-3 py-2 rounded-lg border text-sm ${themeClasses.input}`}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Expired">Expired</option>
                  </select>
                  
                  <select
                    value={activeFilters.subscription}
                    onChange={(e) => setActiveFilters({...activeFilters, subscription: e.target.value})}
                    className={`px-3 py-2 rounded-lg border text-sm ${themeClasses.input}`}
                  >
                    <option value="All">All Plans</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  <thead className={themeClasses.tableHeader}>
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                        <div className="flex items-center">
                          Organization
                          {sortConfig.key === 'name' && (
                            sortConfig.direction === 'ascending' ? 
                              <ChevronUp size={16} className="ml-1" /> : 
                              <ChevronDown size={16} className="ml-1" />
                          )}
                        </div>
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('subscription')}>
                        <div className="flex items-center">
                          Subscription
                          {sortConfig.key === 'subscription' && (
                            sortConfig.direction === 'ascending' ? 
                              <ChevronUp size={16} className="ml-1" /> : 
                              <ChevronDown size={16} className="ml-1" />
                          )}
                        </div>
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                        <div className="flex items-center">
                          Join Date
                          {sortConfig.key === 'date' && (
                            sortConfig.direction === 'ascending' ? 
                              <ChevronUp size={16} className="ml-1" /> : 
                              <ChevronDown size={16} className="ml-1" />
                          )}
                        </div>
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                        <div className="flex items-center">
                          Status
                          {sortConfig.key === 'status' && (
                            sortConfig.direction === 'ascending' ? 
                              <ChevronUp size={16} className="ml-1" /> : 
                              <ChevronDown size={16} className="ml-1" />
                          )}
                        </div>
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {paginatedOrganizations.map((org) => (
                      <tr key={org.id} className={themeClasses.tableRow}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-slate-100">
                          <div className="flex items-center">
                            <Building size={16} className="mr-2 text-indigo-500" />
                            {org.name}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                          {org.contact}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            org.subscription === 'Premium' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                            org.subscription === 'Standard' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {org.subscription}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                          {org.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            org.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            org.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                            org.status === 'Suspended' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400' :
                            'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {org.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleEditOrg(org)}
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteOrg(org.id)}
                              className="text-rose-600 hover:text-rose-900 dark:text-rose-400 dark:hover:text-rose-300"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrganizations.length)} to {Math.min(currentPage * itemsPerPage, filteredOrganizations.length)} of {filteredOrganizations.length} entries
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-lg ${themeClasses.pagination} ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={i}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            currentPage === pageNum 
                              ? 'bg-indigo-600 text-white' 
                              : themeClasses.pagination + ' hover:bg-slate-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="px-2">...</span>
                    )}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-lg ${themeClasses.pagination} ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`rounded-xl shadow-sm p-4 md:p-6 border ${themeClasses.card}`}>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Management
              </h2>
              <p className="text-slate-600 dark:text-slate-400">Content for {currentView} view will appear here</p>
            </div>
          )}
        </main>
      </div>

      {/* Organization Modal */}
      {showOrgModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl shadow-xl w-full max-w-md ${themeClasses.card}`}>
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {currentOrg ? 'Edit Organization' : 'Add New Organization'}
              </h3>
              <button 
                onClick={() => setShowOrgModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitOrg} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClasses.input}`}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleFormChange}
                  className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClasses.input}`}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Subscription Plan
                </label>
                <select
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleFormChange}
                  className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClasses.input}`}
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Join Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClasses.input}`}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClasses.input}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOrgModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {currentOrg ? 'Update Organization' : 'Create Organization'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;