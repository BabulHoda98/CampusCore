
// const RecentlyJoined = () => {
//   const orgs = [
//     { name: "Greenwood High School", date: "2024-07-01", contact: "John Deo", status: "Active" },
//     { name: "City University", date: "2024-06-28", contact: "John Smith", status: "Active" },
//     { name: "Valley Elementary", date: "2024-06-25", contact: "Emily White", status: "Active" },
//     { name: "Northwood College Prep", date: "2024-06-20", contact: "Michael Brown", status: "Active" },
//     { name: "Springfield Academy", date: "2024-06-15", contact: "Admin", status: "Active" },
//   ];

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
//       <h3 className="text-lg font-semibold mb-4 text-gray-800">Recently Joined Organizations</h3>
//       <table className="w-full text-sm text-left text-gray-700">
//         <thead>
//           <tr className="border-b">
//             <th className="px-3 py-2">Organization Name</th>
//             <th className="px-3 py-2">Date Joined</th>
//             <th className="px-3 py-2">Contact Person</th>
//             <th className="px-3 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orgs.map((org, index) => (
//             <tr key={index} className="border-b hover:bg-gray-50">
//               <td className="px-3 py-2">{org.name}</td>
//               <td className="px-3 py-2">{org.date}</td>
//               <td className="px-3 py-2">{org.contact}</td>
//               <td className="px-3 py-2 text-green-600 font-semibold">{org.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RecentlyJoined;


import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';

const RecentlyJoined = () => {
  // Simulating API loading state
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const itemsPerPage = 3;

  // Original data
  const allOrgs = [
    { name: "Greenwood High School", date: "2024-07-01", contact: "John Deo", status: "Active" },
    { name: "City University", date: "2024-06-28", contact: "John Smith", status: "Active" },
    { name: "Valley Elementary", date: "2024-06-25", contact: "Emily White", status: "Pending" },
    { name: "Northwood College Prep", date: "2024-06-20", contact: "Michael Brown", status: "Active" },
    { name: "Springfield Academy", date: "2024-06-15", contact: "Admin", status: "Suspended" },
    { name: "Westside Technical Institute", date: "2024-06-10", contact: "Sarah Johnson", status: "Active" },
    { name: "Lakeshore Middle School", date: "2024-06-05", contact: "Robert Taylor", status: "Pending" },
  ];

  // Simulate API fetch
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    fetchData();
  }, []);

  // Apply sorting
  const sortedOrgs = useMemo(() => {
    const sortableItems = [...allOrgs];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Special handling for dates
        if (sortConfig.key === 'date') {
          return sortConfig.direction === 'ascending' 
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }
        
        // Default comparison
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [allOrgs, sortConfig]);

  // Apply search filter
  const filteredOrgs = useMemo(() => {
    return sortedOrgs.filter(org => 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedOrgs, searchTerm]);

  // Apply pagination
  const paginatedOrgs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrgs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrgs, currentPage]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Handle page change
  const totalPages = Math.ceil(filteredOrgs.length / itemsPerPage);

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent = [
      ['Organization Name', 'Date Joined', 'Contact Person', 'Status'],
      ...filteredOrgs.map(org => [org.name, org.date, org.contact, org.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'organizations.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-800">Recently Joined Organizations</h3>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search organizations..."
            className="w-full sm:w-64 p-2 border rounded-md text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th 
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Organization Name
                      <span className="text-xs">{getSortIndicator('name')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => requestSort('date')}
                  >
                    <div className="flex items-center gap-1">
                      Date Joined
                      <span className="text-xs">{getSortIndicator('date')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => requestSort('contact')}
                  >
                    <div className="flex items-center gap-1">
                      Contact Person
                      <span className="text-xs">{getSortIndicator('contact')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => requestSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      <span className="text-xs">{getSortIndicator('status')}</span>
                    </div>
                  </th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrgs.length > 0 ? (
                  paginatedOrgs.map((org, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2">{org.name}</td>
                      <td className="px-3 py-2">{format(new Date(org.date), 'MMM dd, yyyy')}</td>
                      <td className="px-3 py-2">{org.contact}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          org.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : org.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {org.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-3 py-4 text-center text-gray-500">
                      No organizations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {paginatedOrgs.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
              <div className="text-sm text-gray-600">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrgs.length)}-
                {Math.min(currentPage * itemsPerPage, filteredOrgs.length)} of {filteredOrgs.length} organizations
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Previous
                </button>
                
                <span className="text-sm">
                  Page {currentPage} of {Math.max(1, totalPages)}
                </span>
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages || totalPages === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecentlyJoined;